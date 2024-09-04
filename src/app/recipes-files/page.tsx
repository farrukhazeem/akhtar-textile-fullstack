// "use client";

// import React, { useState } from "react";
// import { Modal, Upload, Button, Progress, message, Card, Col, Row } from "antd";
// import { UploadOutlined } from '@ant-design/icons';
// import axios from 'axios';
// import type { RcFile } from 'antd/es/upload/interface';

// const RecipeFiles: React.FC = () => {
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [fileNames, setFileNames] = useState<string[]>([]);
//   const [data, setData] = useState<any>(null)

//   const showModal = () => {
//     setIsModalOpen(true);
//   };

//   const handleCancel = () => {
//     setIsModalOpen(false);

//   };

//   const handleUpload = async (file: RcFile) => {
    
//     const formData = new FormData();
//     formData.append('files', file);

//     try {


      

//       // Perform the actual file upload
//       const response = await axios.post('http://localhost:8000/uploadfile/', formData, {
//         headers: {
//           'Content-Type': 'multipart/form-data',
//         },
//       });
//       setData(response.data)
//       console.log('Server Response:', response.data);
//       message.success('File uploaded successfully');
//       setIsModalOpen(false);
//     } catch (error) {
//       console.error('Error uploading file:', error);
//       message.error('Error uploading file');
//     } 
//   };

//   return (
//     <>
//     <div>
//       {data? <span>{data.recipes[0].file_name}</span> : <span>Loading...</span>}
//     </div>
//       <Button type="primary" style={{ backgroundColor: '#797FE7' }} onClick={showModal}>Upload Excel</Button>
//       <Modal
//         title="Upload File"
//         open={isModalOpen}
//         onCancel={handleCancel}
//         footer={null}
//         closeIcon={<Button onClick={handleCancel}>X</Button>}
//       >
//         <Upload
//             customRequest={({ file, onSuccess, onError }) => {
//               const rcFile = file as RcFile;

//               handleUpload(rcFile)
//                 .then(() => {
//                   console.log("File has been uploaded", rcFile);

//                   // Add the uploaded file name to the state
//                   setFileNames((prevNames) => [...prevNames, rcFile.name]);

//                 })
//                 .catch((error) => {
//                   onError?.(error);
//                 });
//             }}
//             showUploadList={false}
//           >
//           <Button icon={<UploadOutlined />}>Choose Files</Button>
//         </Upload>



//       </Modal>
//       <div style={{ marginTop: '20px' }}>
//         <Row gutter={[16, 16]}>
//           {fileNames.map((fileName, index) => (
//             <Col xs={24} sm={12} md={8} lg={6} key={index}>
//               <Card style={{ width: 200, textAlign: 'center', border: '1px solid #ddd' }}>
//                 <p>{fileName}</p>
//               </Card>
//             </Col>
//           ))}
//         </Row>
//       </div>

//     </>
//   );
// };

// export default RecipeFiles;


"use client";

import React, { useState, useEffect } from "react";
import { Button, Table, Row, Col, message } from "antd";
import { ColumnsType } from "antd/es/table";
import axios from "axios";

interface StepData {
  key: number;
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

interface RecipeDetailsProps {
  recipeId: number;
}

const RecipeDetails: React.FC<RecipeDetailsProps> = ({ recipeId }) => {
  const [recipeData, setRecipeData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  // Define columns for the table
  const columns: ColumnsType<StepData> = [
    // Define your columns here
  ];

  // Fetch recipe details when the component mounts or recipeId changes
  useEffect(() => {
    const fetchRecipeDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/recipes/${recipeId}`);
        const recipe = response.data;

        // Process recipe steps data for the table
        const recipesDataForTable = recipe.steps.map((step: any, index: number) => ({
          key: index,
          step: step.step_no,
          action: step.action,
          minutes: step.minutes,
          liters: step.liters,
          rpm: step.rpm,
          chemicalName: step.chemicals.map((chemical: any) => chemical.recipe_name),
          percentage: step.chemicals.map((chemical: any) => chemical.percentage),
          dosage: step.chemicals.map((chemical: any) => chemical.dosage),
          centigrade: step.temperature,
        }));

        setRecipeData({
          ...recipe,
          stepsData: recipesDataForTable,
        });
      } catch (error) {
        console.error('Error fetching recipe details:', error);
        message.error('Error fetching recipe details');
      } finally {
        setLoading(false);
      }
    };

    fetchRecipeDetails();
  }, [recipeId]);

  return (
    <div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div>
          <Row style={{ marginBottom: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Col>
              <h1 style={{ color: '#343C6A', fontSize: '20px', fontWeight: 'bold' }}>Recipe Details</h1>
            </Col>
          </Row>
          <div style={{ padding: '20px', backgroundColor: 'white', borderRadius: '15px' }}>
            <Table
              columns={columns}
              dataSource={recipeData?.stepsData}
              pagination={false}
              bordered
              style={{ width: '100%' }}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default RecipeDetails;
