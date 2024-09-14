"use client";
import { useEffect, useState } from 'react';
import { Card, Row, Col, Typography, Spin, Empty, Button, message } from 'antd';
import Link from 'next/link';
import axios from 'axios';

const { Title, Text } = Typography;

interface Recipe {
  id: number;
  recipe_name: string;
  [key: string]: any;
}

const Recipe = () => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

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

  // Function to handle export
  const handleExport = async () => {
    try {
      const response = await axios.get('/api/exportRecipes', {
        responseType: 'blob', // Important for downloading binary data
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
      {/* Flexbox layout for title and export button */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <Title level={1} style={{ margin: 0 }}>Recipes</Title>
        <Button type="primary" onClick={handleExport}>
          Export Data
        </Button>
      </div>
      
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
                      <Text style={{ color: '#1890ff', textDecoration: 'underline' }}>View Details</Text>
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
