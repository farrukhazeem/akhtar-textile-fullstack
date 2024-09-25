// 'use client';

// import { useEffect, useState } from 'react';
// import { Card, Row, Col, Typography, Spin, Empty, Button, message, Upload, Modal } from 'antd';
// import Link from 'next/link';
// import axios from 'axios';
// import { UploadOutlined } from '@ant-design/icons';

// const { Title, Text } = Typography;

// interface Recipe {
//   id: number;
//   recipe_name: string;
//   [key: string]: any;
// }

// interface UploadResponse {
//   id: number;
//   file_name: string;
//   // Add other properties as needed
// }

// const Recipe = () => {
//   const [recipes, setRecipes] = useState<Recipe[]>([]);
//   const [loading, setLoading] = useState<boolean>(true);
//   const [uploading, setUploading] = useState<boolean>(false); // For upload spinner
//   const [error, setError] = useState<string | null>(null);
//   const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

//   useEffect(() => {
//     const fetchRecipes = async () => {
//       try {
//         const response = await fetch('/api/getRecipe',{
//           cache: 'no-store'
//         });
//         if (!response.ok) {
//           throw new Error('Network response was not ok');
//         }
//         const data: Recipe[] = await response.json();
//         setRecipes(data);
//       } catch (error) {
//         setError('Failed to fetch recipes');
//         console.error('Failed to fetch recipes:', error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchRecipes();
//   }, []);

//   const handleExport = async () => {
//     try {
//       const response = await axios.get('/api/exportRecipes', {
//         responseType: 'blob',
//       });

//       // Create a URL for the blob and trigger download
//       const url = window.URL.createObjectURL(new Blob([response.data]));
//       const link = document.createElement('a');
//       link.href = url;
//       link.setAttribute('download', 'recipes.xlsx');
//       document.body.appendChild(link);
//       link.click();
//       document.body.removeChild(link);
//     } catch (error) {
//       console.error('Failed to export recipes:', error);
//       message.error('Failed to export recipes');
//     }
//   };

//   const handleUpload = async (files: File[]) => {
//     const formData = new FormData();
    
//     files.forEach(file => {
//       formData.append('files', file);
//     });

//     try {
//       setUploading(true); // Start loading spinner
//       const uploadResponse = await axios.post('https://huge-godiva-arsalan-3b36a0a1.koyeb.app/uploadfile', formData, {
//         headers: { 'Content-Type': 'multipart/form-data' },
//       });

//       console.log('Upload Response:', uploadResponse.data);
      
//       const fileDataArray = uploadResponse.data.recipes;

//       await Promise.all(fileDataArray.map((fileData: UploadResponse) =>
//         axios.post('/api/saveBulkRecipes/', fileData, {
//           headers: { 'Content-Type': 'application/json' },
//         })
//       ));

//       message.success('All recipes saved successfully');
//       setIsModalOpen(false); // Close modal on success
//     } catch (error) {
//       console.error('Error uploading files:', error);
//       message.error('Error uploading files');
//     } finally {
//       setUploading(false);
//     }

//     return false;
//   };

//   const showModal = () => {
//     setIsModalOpen(true);
//   };

//   const handleCancel = () => {
//     setIsModalOpen(false);
//   };

//   if (loading) {
//     return (
//       <div style={{ textAlign: 'center', padding: '2rem' }}>
//         <Spin size="large" />
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div style={{ textAlign: 'center', padding: '2rem' }}>
//         <Title level={4}>Error: {error}</Title>
//       </div>
//     );
//   }
//   const groupedRecipes: { [key: string]: Recipe[] } = recipes.reduce((acc, recipe) => {
//     const date = new Date(recipe.created_at).toLocaleDateString();
//     if (!acc[date]) {
//       acc[date] = [];
//     }
//     acc[date].push(recipe);
//     return acc;
//   }, {} as { [key: string]: Recipe[] });

//   return (
//     <div style={{ padding: '2rem' }}>
//       <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
//         <Title level={1} style={{ margin: 0 }}>Recipes</Title>
//         <div style={{ display: 'flex', gap: '1rem' }}>
//           <Button
//             type="primary"
//             onClick={handleExport}
//             style={{ backgroundColor: '#797FE7', borderColor: '#797FE7' }}
//             disabled={uploading} // Disable buttons during upload
//           >
//             Export Data
//           </Button>
//           <Button
//             type="default"
//             onClick={showModal}
//             style={{ backgroundColor: 'white', borderColor: '#d9d9d9' }}
//             disabled={uploading} // Disable buttons during upload
//           >
//             <UploadOutlined /> Upload
//           </Button>
//         </div>
//       </div>

      
//       <Modal
//         title="Upload File"
//         visible={isModalOpen}
//         onCancel={handleCancel}
//         footer={null} // Remove default footer buttons
//       >
//         {uploading ? (
//           <div style={{ textAlign: 'center', padding: '2rem' }}>
//             <Spin size="large" />
//           </div>
//         ) : (
//           <Upload
//             beforeUpload={(file) => handleUpload([file])}
//             accept=".xlsx, .xls"
//             multiple={true}
//           >
//             <Button icon={<UploadOutlined />}>Click to Upload</Button>
//           </Upload>
//         )}
//       </Modal>

//       {Object.keys(groupedRecipes).length === 0 ? (
//         <Empty description="No recipes found" />
//       ) : (
//         <div>
//           {Object.keys(groupedRecipes).map(date => (
//             <div key={date}>
//               <Text style={{ fontWeight: 'bold', marginBottom: '1rem' }}>{date}</Text>
//               <Row gutter={16}>
//                 {groupedRecipes[date].map((recipe: Recipe) => (
//                   <Col span={8} key={recipe.id}>
//                     <Link href={`/recipesDetails/${recipe.id}`}>
//                       <Card hoverable style={{ marginBottom: '1rem' }}>
//                         <Card.Meta
//                           title={
//                             <div style={{ display: 'flex', alignItems: 'center' }}>
//                               <img src="/img/excel.png" alt="Excel Logo" style={{ width: '20px', height: '20px', marginRight: '0.5rem' }} />
//                               {recipe.name}
//                             </div>
//                           }
//                         />
//                       </Card>
//                     </Link>
//                   </Col>
//                 ))}
//               </Row>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default Recipe;


'use client';

import { useEffect, useState } from 'react';
import { Card, Row, Col, Typography, Spin, Empty, Button, message, Upload, Modal, Input, Pagination } from 'antd';
import Link from 'next/link';
import axios from 'axios';
import { UploadOutlined, LoadingOutlined, SearchOutlined } from '@ant-design/icons';

const { Title, Text } = Typography;

interface Recipe {
  id: number;
  recipe_name: string;
  created_at: string;
  [key: string]: any;
}

interface UploadResponse {
  id: number;
  file_name: string;
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

  const handleUpload = async (files: File[]) => {
    const formData = new FormData();
    files.forEach(file => formData.append('files', file)); // Add files to formData
  
    try {
      setUploading(true);
  
      const uploadResponse = await axios.post('https://huge-godiva-arsalan-3b36a0a1.koyeb.app/uploadfile', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
  
      const fileDataArray = uploadResponse.data.recipes;
  
      const fileNames: string[] = []; // Store file names for the message
  
      // Use a regular for loop to ensure we collect filenames before showing success message
      for (let i = 0; i < fileDataArray.length; i++) {
        const fileData = fileDataArray[i];
        try {
          await axios.post('/api/saveBulkRecipes/', fileData, {
            headers: { 'Content-Type': 'application/json' },
          });
          // Add file name to list for a single success message
          fileNames.push(files[i].name);
        } catch (error) {
          throw new Error(`Failed to save recipe from file: ${files[i].name}`);
        }
      }
  
      // Show success message only after all files are saved
      message.success(`Recipes were saved successfully: ${fileNames}`);
  
      setIsModalOpen(false);
      fetchRecipes(); // Fetch recipes only after all are saved
    } catch (error) {
      console.error('Error uploading or saving files:', error);
      message.error('Error uploading or saving files');
    } finally {
      setUploading(false);
    }
  
    return false;
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

  return (
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
          <Button type="default" onClick={showModal} disabled={uploading} style={{borderColor: '#797FE7'}}>
            <UploadOutlined /> Upload
          </Button>
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
                    <Link href={`/recipesDetails/${recipe.id}`}>
                      <Card hoverable style={{ marginBottom: '1rem' }}>
                        <Card.Meta
                          title={<div style={{ display: 'flex', alignItems: 'center' }}>
                            <img src="/img/excel.png" alt="Excel Logo" style={{ width: '20px', height: '20px', marginRight: '0.5rem' }} />
                            {recipe.name}
                          </div>}
                        />
                      </Card>
                    </Link>
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
  );
};

export default Recipe;
