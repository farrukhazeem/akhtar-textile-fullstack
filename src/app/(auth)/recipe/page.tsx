// "use client";

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

// interface Chemical {
//   recipe_name: string;
//   percentage: number;
//   dosage: number;
// }

// interface Step {
//   step: number;
//   action: string;
//   minutes: number;
//   liters: number;
//   rpm: number;
//   chemicalName: string[];
//   percentage: number[];
//   dosage: number[];
//   centigrade: number;
// }

// const Recipe = () => {
//   const [recipes, setRecipes] = useState<Recipe[]>([]);
//   const [loading, setLoading] = useState<boolean>(true);
//   const [error, setError] = useState<string | null>(null);
//   const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  
//   // Assuming you have these variables from somewhere in your app
//   const [recipe1, setRecipe1] = useState<{ file_name: string } | null>(null);
//   const [tableData, setTableData] = useState<Step[]>([]);

//   useEffect(() => {
//     const fetchRecipes = async () => {
//       try {
//         const response = await fetch('/api/getRecipe');
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

 
//   interface UploadResponse {
//     id: number;
//     file_name: string;
//     // Add other properties as needed
//   }
  
//   const handleUpload = async (files: File[]) => {
//     const formData = new FormData();
//     files.forEach(file => {
//       formData.append('files', file);
//     });
  
//     try {
//       const uploadResponse = await axios.post('https://huge-godiva-arsalan-3b36a0a1.koyeb.app/uploadfile', formData, {
//         headers: { 'Content-Type': 'multipart/form-data' },
//       });
  
//       console.log('Upload Response:', uploadResponse.data);
      
//       // Get the recipes array from the response
//       const fileDataArray = uploadResponse.data.recipes; // Adjusted here
  
//       // Automatically save each file's data
//       await Promise.all(fileDataArray.map((fileData: UploadResponse) => 
//         axios.post('http://localhost:3000/api/saveRecipe/', fileData, {
//           headers: { 'Content-Type': 'application/json' },
//         })
//       ));
  
//       message.success('All recipes saved successfully');
//     } catch (error) {
//       console.error('Error uploading files:', error);
//       message.error('Error uploading files');
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

//   return (
//     <div style={{ padding: '2rem' }}>
//       {/* Flexbox layout for title and buttons */}
//       <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
//         <Title level={1} style={{ margin: 0 }}>Recipes</Title>
//         <div style={{ display: 'flex', gap: '1rem' }}>
//           <Button
//             type="primary"
//             onClick={handleExport}
//             style={{ backgroundColor: '#797FE7', borderColor: '#797FE7' }}
//           >
//             Export Data
//           </Button>
//           <Button
//             type="default"
//             onClick={showModal}
//             style={{ backgroundColor: 'white', borderColor: '#d9d9d9' }}
//           >
//             <UploadOutlined /> Upload
//           </Button>
//         </div>
//       </div>

//       {/* Modal for upload */}
//       <Modal
//         title="Upload File"
//         visible={isModalOpen}
//         onCancel={handleCancel}
//         footer={null} // To remove the default footer buttons
//       >
//         <Upload
//         beforeUpload={(file) => handleUpload([file])} 
//         accept=".xlsx, .xls"
//         multiple={true} 
//         >
//         <Button icon={<UploadOutlined />}>Click to Upload</Button>
//         </Upload>
//       </Modal>
      
//       {recipes.length === 0 ? (
//         <div style={{ textAlign: 'center', padding: '2rem' }}>
//           <Empty description="No recipes found" />
//         </div>
//       ) : (
//         <Row gutter={16}>
//           {recipes.map(recipe => (
//             <Col span={8} key={recipe.id}>
//               <Link href={`/recipesDetails/${recipe.id}`}>
//               <Card
              
//                 hoverable
//                 cover={<img alt={recipe.recipe_name} src="https://via.placeholder.com/300" />} // Placeholder image
//                 style={{ marginBottom: '1rem' }}
//               >
//                 <Card.Meta
//                   title={recipe.name}
//                   description={
//                       <Text style={{ color: '#797FE7', textDecoration: 'underline' }}>View Details</Text>
//                   }
//                 />
//               </Card>
//               </Link>
//             </Col>
//           ))}
//         </Row>
//       )}
//     </div>
//   );
// };

// export default Recipe;


'use client';

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

interface UploadResponse {
  id: number;
  file_name: string;
  // Add other properties as needed
}

const Recipe = () => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [uploading, setUploading] = useState<boolean>(false); // For upload spinner
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

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

  const handleUpload = async (files: File[]) => {
    const formData = new FormData();
    
    files.forEach(file => {
      formData.append('files', file);
    });

    try {
      setUploading(true); // Start loading spinner
      const uploadResponse = await axios.post('https://huge-godiva-arsalan-3b36a0a1.koyeb.app/uploadfile', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      console.log('Upload Response:', uploadResponse.data);
      
      const fileDataArray = uploadResponse.data.recipes;

      await Promise.all(fileDataArray.map((fileData: UploadResponse) =>
        axios.post('/api/saveBulkRecipes/', fileData, {
          headers: { 'Content-Type': 'application/json' },
        })
      ));

      message.success('All recipes saved successfully');
      setIsModalOpen(false); // Close modal on success
    } catch (error) {
      console.error('Error uploading files:', error);
      message.error('Error uploading files');
    } finally {
      setUploading(false);
    }

    return false;
  };

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
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
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <Title level={1} style={{ margin: 0 }}>Recipes</Title>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <Button
            type="primary"
            onClick={handleExport}
            style={{ backgroundColor: '#797FE7', borderColor: '#797FE7' }}
            disabled={uploading} // Disable buttons during upload
          >
            Export Data
          </Button>
          <Button
            type="default"
            onClick={showModal}
            style={{ backgroundColor: 'white', borderColor: '#d9d9d9' }}
            disabled={uploading} // Disable buttons during upload
          >
            <UploadOutlined /> Upload
          </Button>
        </div>
      </div>

      
      <Modal
        title="Upload File"
        visible={isModalOpen}
        onCancel={handleCancel}
        footer={null} // Remove default footer buttons
      >
        {uploading ? (
          <div style={{ textAlign: 'center', padding: '2rem' }}>
            <Spin size="large" />
          </div>
        ) : (
          <Upload
            beforeUpload={(file) => handleUpload([file])}
            accept=".xlsx, .xls"
            multiple={true}
          >
            <Button icon={<UploadOutlined />}>Click to Upload</Button>
          </Upload>
        )}
      </Modal>


      {recipes.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '2rem' }}>
          <Empty description="No recipes found" />
        </div>
      ) : (
        <Row gutter={16}>
          {recipes.map(recipe => (
            <Col span={8} key={recipe.id}>
              <Link href={`/recipesDetails/${recipe.id}`}>
                <Card
                  hoverable
                  cover={<img alt={recipe.recipe_name} src="https://via.placeholder.com/300" />} // Placeholder image
                  style={{ marginBottom: '1rem' }}
                >
                  <Card.Meta
                    title={recipe.name}
                    description={
                      <Text style={{ color: '#797FE7', textDecoration: 'underline' }}>View Details</Text>
                    }
                  />
                </Card>
              </Link>
            </Col>
          ))}
        </Row>
      )}
    </div>
  );
};

export default Recipe;
