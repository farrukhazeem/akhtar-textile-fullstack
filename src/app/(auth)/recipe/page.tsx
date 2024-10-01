'use client';

import { useEffect, useState } from 'react';
import { Card, Row, Col, Typography, Spin, Empty, Button, message, Upload, Modal, Input, Pagination, Popconfirm, Tabs, Table } from 'antd';
import Link from 'next/link';
import axios from 'axios';
import { UploadOutlined, LoadingOutlined, SearchOutlined, DeleteOutlined } from '@ant-design/icons';
import TabPane from 'antd/es/tabs/TabPane';
import { RcFile } from 'antd/es/upload';

const { Title, Text } = Typography;

interface Recipe {
  id: number;
  recipe_name: string;
  created_at: string;
  [key: string]: any;
}

interface FileData {
  id: string; // or number, based on your data
  name: string;
  // Add any other properties that you expect in the response
}


const Recipe = () => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [uploading, setUploading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [startDate, setStartDate] = useState<string | null>(null);
  const [endDate, setEndDate] = useState<string | null>(null);
  const [isExporting, setIsExporting] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState<string>(''); // State for search term
  const [modalType, setModalType] = useState('success'); // 'success' or 'failed'
  const [showPageElements, setShowPageElements] = useState(true); // State to control visibility

  // State for success and failure uploads
  const [successUploads, setSuccessUploads] = useState<string[]>([]);
  const [failedUploads, setFailedUploads] = useState<string[]>([]);

  // Pagination states
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(18); // Adjust page size here

  const exportSpinner = <LoadingOutlined style={{ fontSize: 18, color: '#ffffff' }} spin />;
  const pageLoadingSpinner = <LoadingOutlined style={{ fontSize: 48, color: '#800080' }} spin />;

  useEffect(() => {
    fetchRecipes();
  }, []);

  const fetchRecipes = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/getRecipe', { cache: 'no-store' });
      if (!response.ok) throw new Error('Network response was not ok');
      const data: Recipe[] = await response.json();
      setRecipes(data);
    } catch (error) {
      setError('Failed to fetch recipes');
      console.error('Failed to fetch recipes:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await axios.delete(`/api/deleteRecipe/${id}`);
      message.success('Recipe deleted successfully');
      fetchRecipes();
    } catch (error) {
      console.error('Failed to delete recipe:', error);
      message.error('Failed to delete recipe');
    }
  };

  const handleExport = async () => {
    if (!startDate || !endDate) {
      message.error('Please select both start and end dates');
      return;
    } else if (startDate > endDate) {
      message.error('Start date is less than end date');
      return;
    }
    setIsExporting(true);

    try {
      const response = await axios.get('/api/exportRecipes', {
        params: { start_date: startDate, end_date: endDate },
        responseType: 'blob',
      });

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'recipes.xlsx');
      document.body.appendChild(link);
      link.click();
      message.success('File Downloaded');
      document.body.removeChild(link);
    } catch (error) {
      console.error('Failed to export recipes:', error);
      message.error('Failed to export recipes');
    } finally {
      setIsExporting(false);
    }
  };
  
  // const handleUpload = async (files: File[]) => {
  
  //   const formData = new FormData();
  //   files.forEach(file => formData.append('files', file)); // Add files to formData
  
  //   try {
  //     setUploading(true);
  
  //     const uploadResponse = await axios.post('https://huge-godiva-arsalan-3b36a0a1.koyeb.app/uploadfile', formData, {
  //       headers: { 'Content-Type': 'multipart/form-data' },
  //     });
  
  //     const fileDataArray = uploadResponse.data.recipes;
  
  //     const successNames: string[] = [];
  //     const failedNames: string[] = [];
  
  //     // Handle saving of each file
  //     await Promise.all(fileDataArray.map(async (fileData: FileData, index: number) => {
  //       try {
  //         await axios.post('/api/saveBulkRecipes/', fileData, {
  //           headers: { 'Content-Type': 'application/json' },
  //         });
  //         successNames.push(files[index].name);
  //       } catch (error) {
  //         failedNames.push(files[index].name);
  //       }
  //     }));
  
  //     // Update success and failure states
  //     setSuccessUploads(prev => [...prev, ...successNames]);
  //     setFailedUploads(prev => [...prev, ...failedNames]);
  
  //     message.success(`Recipes were saved successfully: ${successNames.join(', ')}`);
  //     setIsModalOpen(false);
  //     fetchRecipes();
  //   } catch (error) {
  //     console.error('Error uploading or saving files:', error);
  //     message.error('Error uploading or saving files');
  //   } finally {
  //     setUploading(false);
  //   }

  
  const handleUpload = async (files: File[]) => {
    const formData = new FormData();
    files.forEach(file => formData.append('files', file)); // Add files to formData
  
    try {
      setUploading(true);
  
      // Hide page elements while uploading
      setShowPageElements(false);
  
      // Step 1: Upload files
      const uploadResponse = await axios.post('https://huge-godiva-arsalan-3b36a0a1.koyeb.app/uploadfile', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
  
      const fileDataArray = uploadResponse.data.recipes;
  
      const successNames: string[] = [];
      const failedNames: string[] = [];
  
      // Step 2: Batch save recipes
      const batchSize = 50; // Set batch size to 50 for optimal performance
      for (let i = 0; i < fileDataArray.length; i += batchSize) {
        const batch = fileDataArray.slice(i, i + batchSize);
  
        try {
          await axios.post('/api/saveBulkRecipes/', batch, {
            headers: { 'Content-Type': 'application/json' },
          });
  
          // Collect successful file names for this batch
          const batchSuccessNames = files.slice(i, i + batchSize).map(file => file.name);
          successNames.push(...batchSuccessNames);
        } catch (error) {
          console.error(`Error saving batch starting with ${files[i].name}:`, error);
          const batchFailedNames = files.slice(i, i + batchSize).map(file => file.name);
          failedNames.push(...batchFailedNames);
        }
      }
  
      // Step 3: Update success and failure states
      setSuccessUploads(prev => [...prev, ...successNames]);
      setFailedUploads(prev => [...prev, ...failedNames]);
  
      message.success(`Recipes were saved successfully: ${successNames.join(', ')}`);
      setIsModalOpen(false);
      fetchRecipes();
    } catch (error) {
      console.error('Error uploading or saving files:', error);
      message.error('Error uploading or saving files');
    } finally {
      // Show page elements after processing is done
      setShowPageElements(true);
      setUploading(false);
    }
  };
  

  const showModal = () => setIsModalOpen(true);
  const handleCancel = () => setIsModalOpen(false);

  const filteredRecipes = recipes.filter(recipe =>
    recipe.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handlePaginationChange = (page: number, pageSize?: number) => {
    setCurrentPage(page);
    if (pageSize) setPageSize(pageSize);
  };

  const startIndex = (currentPage - 1) * pageSize;
  const paginatedRecipes = filteredRecipes.slice(startIndex, startIndex + pageSize);

  if (loading) return <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh' }}><Spin indicator={pageLoadingSpinner} /></div>;
  if (error) return <Title level={4} style={{ textAlign: 'center', padding: '2rem' }}>Error: {error}</Title>;

  const groupedRecipes: { [key: string]: Recipe[] } = paginatedRecipes.reduce((acc, recipe) => {
    const date = new Date(recipe.created_at).toLocaleDateString();
    if (!acc[date]) acc[date] = [];
    acc[date].push(recipe);
    return acc;
  }, {} as { [key: string]: Recipe[] });
  const handleDeleteAll = async () => {
    try {
      await axios.delete('/api/deleteAllRecipes');
      message.success('All recipes deleted successfully');
      fetchRecipes();
    } catch (error) {
      console.error('Failed to delete all recipes:', error);
      message.error('Failed to delete all recipes');
    }
  };
  
  console.log("success", successUploads)
  console.log("failed", failedUploads)

  return (

    <>
      {!showPageElements && <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh' }}><Spin indicator={pageLoadingSpinner} /></div>} {/* Optional loading spinner */}
      {showPageElements && (
        <div style={{ padding: '2rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
          <Title level={1} style={{ margin: 0}}>Recipes</Title>
          <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
            <Input
              placeholder="Search by recipe name"
              prefix={<SearchOutlined />}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <input type="date" onChange={(e) => setStartDate(e.target.value)} />
            <input type="date" onChange={(e) => setEndDate(e.target.value)} />
            <Button type="primary" onClick={handleExport} disabled={uploading} style={{ backgroundColor: '#797FE7', borderColor: '#797FE7' }}>
              {isExporting ? <Spin indicator={exportSpinner} /> : 'Export'}
            </Button>
            <Button type="default" onClick={showModal} disabled={uploading} style={{ borderColor: '#797FE7' }}>
              <UploadOutlined /> Upload
            </Button>
            <Popconfirm
              title="Are you sure you want to delete all recipes?"
              onConfirm={handleDeleteAll}
              okText="Yes"
              cancelText="No"
            >
              <Button type="primary" danger>
                Delete All
              </Button>
            </Popconfirm>
          </div>
        </div>

        <Modal title="Upload File" visible={isModalOpen} onCancel={handleCancel} footer={null}>
          {uploading ? (
            <center><Spin size="large" style={{ textAlign: 'center', padding: '2rem' }} /></center>
          ) : (
            <Upload beforeUpload={(file) => handleUpload([file])} accept=".xlsx, .xls" multiple>
              <Button icon={<UploadOutlined />}>Click to Upload</Button>
            </Upload>
          )}
        </Modal>

        
        {Object.keys(groupedRecipes).length === 0 ? (
          <Empty description="No recipes found" />
        ) : (
          <div>
            {Object.keys(groupedRecipes).map(date => (
              <div key={date}>
                <Text style={{ fontWeight: 'bold', marginBottom: '1rem' }}>{date}</Text>
                <Row gutter={16}>
                  {groupedRecipes[date].map((recipe: Recipe) => (
                    <Col span={8} key={recipe.id}>
                      <Card hoverable style={{ marginBottom: '1rem' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <Link href={`/recipesDetails/${recipe.id}`}>
                            <div style={{ display: 'flex', alignItems: 'center', color:'black', fontWeight:'500' }}>
                              <img src="/img/excel.png" alt="Excel Logo" style={{ width: '20px', height: '20px', marginRight: '0.5rem' }} />
                              {recipe.name}
                            </div>
                          </Link>
                          <Popconfirm
                            title="Are you sure to delete this recipe?"
                            onConfirm={() => handleDelete(recipe.id)}
                            okText="Yes"
                            cancelText="No"
                          >
                            <DeleteOutlined style={{ color: '#797FE7', cursor: 'pointer' }} />
                          </Popconfirm>
                        </div>
                      </Card>
                    </Col>
                  ))}
                </Row>
              </div>
            ))}

            {/* Pagination Component */}
            <Pagination
              current={currentPage}
              pageSize={pageSize}
              total={filteredRecipes.length}
              onChange={handlePaginationChange}
              showSizeChanger
              pageSizeOptions={['15', '25', '35']}
              style={{ marginTop: '2rem', textAlign: 'center' }}
            />

            

          </div>


          

          
        )}
        </div>
      )}
    </>
    
  );
};

export default Recipe;
