"use client";

import { useEffect, useState } from 'react';
import { Card, Row, Col, Typography, Spin, Empty, Button, message, Upload, Modal } from 'antd';
import Link from 'next/link';
import axios from 'axios';
import { UploadOutlined } from '@ant-design/icons';

const { Title, Text } = Typography;

interface Recipe {
  id: number;
  recipe_name: string;
  [key: string]: any;
}

interface Chemical {
  recipe_name: string;
  percentage: number;
  dosage: number;
}

interface Step {
  step: number;
  action: string;
  minutes: number;
  liters: number;
  rpm: number;
  chemicalName: string[];
  percentage: number[];
  dosage: number[];
  centigrade: number;
}

const Recipe = () => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  
  // Assuming you have these variables from somewhere in your app
  const [recipe1, setRecipe1] = useState<{ file_name: string } | null>(null);
  const [tableData, setTableData] = useState<Step[]>([]);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await fetch('/api/getRecipe');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data: Recipe[] = await response.json();
        setRecipes(data);
      } catch (error) {
        setError('Failed to fetch recipes');
        console.error('Failed to fetch recipes:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchRecipes();
  }, []);

  const handleExport = async () => {
    try {
      const response = await axios.get('/api/exportRecipes', {
        responseType: 'blob',
      });

      // Create a URL for the blob and trigger download
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'recipes.xlsx');
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error('Failed to export recipes:', error);
      message.error('Failed to export recipes');
    }
  };

  const handleUpload = async (file: File) => {
    const formData = new FormData();
    formData.append('files', file);
  
    try {
      const uploadResponse = await axios.post('https://huge-godiva-arsalan-3b36a0a1.koyeb.app/uploadfile', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      
      console.log('Upload Response:', uploadResponse.data);
  
      await axios.post('http://localhost:3000/api/saveRecipe/', uploadResponse, {
        headers: { 'Content-Type': 'application/json' },
      });
  
      message.success('Recipe saved successfully');

    } catch (error) {
      console.error('Error uploading file:', error);
      message.error('Error uploading file');
    }
  
    return false; // Prevent automatic file upload
  };
  
  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  // Construct recipeData from recipe1 and tableData
  const recipeData = recipe1 && tableData ? {
    fileName: recipe1.file_name,
    steps: tableData.map((step) => {
      const chemicals = step.chemicalName.map((name, index) => ({
        recipe_name: name,
        percentage: step.percentage[index],
        dosage: step.dosage[index],
      }));

      return {
        step_no: step.step,
        action: step.action,
        minutes: step.minutes,
        litres: step.liters,
        rpm: step.rpm,
        chemicals: chemicals,
        temperature: step.centigrade,
      };
    }),
  } : null;

  useEffect(() => {
    if (recipeData) {
      console.log('Recipe Data to be sent:', recipeData);
    }
  }, [recipeData]);

  if (loading) {
    return (
      <div style={{ textAlign: 'center', padding: '2rem' }}>
        <Spin size="large" />
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ textAlign: 'center', padding: '2rem' }}>
        <Title level={4}>Error: {error}</Title>
      </div>
    );
  }

  return (
    <div style={{ padding: '2rem' }}>
      {/* Flexbox layout for title and buttons */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <Title level={1} style={{ margin: 0 }}>Recipes</Title>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <Button
            type="primary"
            onClick={handleExport}
            style={{ backgroundColor: '#797FE7', borderColor: '#797FE7' }}
          >
            Export Data
          </Button>
          <Button
            type="default"
            onClick={showModal}
            style={{ backgroundColor: 'white', borderColor: '#d9d9d9' }}
          >
            <UploadOutlined /> Upload
          </Button>
        </div>
      </div>

      {/* Modal for upload */}
      <Modal
        title="Upload File"
        visible={isModalOpen}
        onCancel={handleCancel}
        footer={null} // To remove the default footer buttons
      >
        <Upload
          beforeUpload={handleUpload}
          accept=".xlsx, .xls"
          multiple={true} // Allow only one file at a time
        >
          <Button icon={<UploadOutlined />}>Click to Upload</Button>
        </Upload>
      </Modal>
      
      {recipes.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '2rem' }}>
          <Empty description="No recipes found" />
        </div>
      ) : (
        <Row gutter={16}>
          {recipes.map(recipe => (
            <Col span={8} key={recipe.id}>
              <Card
                hoverable
                cover={<img alt={recipe.recipe_name} src="https://via.placeholder.com/300" />} // Placeholder image
                style={{ marginBottom: '1rem' }}
              >
                <Card.Meta
                  title={recipe.recipe_name}
                  description={
                    <Link href={`/recipesDetails/${recipe.id}`}>
                      <Text style={{ color: '#797FE7', textDecoration: 'underline' }}>View Details</Text>
                    </Link>
                  }
                />
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </div>
  );
};

export default Recipe;
