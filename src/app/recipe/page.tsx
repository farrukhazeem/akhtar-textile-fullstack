// "use client";

// import React, { useState } from "react";
// import { Form, Input, InputNumber, Select, Row, Col, Button, Table, Modal, Upload, message, Progress } from "antd";
// import { ColumnsType } from "antd/es/table";
// import { UploadOutlined } from '@ant-design/icons';
// import axios from 'axios';
// import type { RcFile } from 'antd/es/upload/interface';

// const { Option } = Select;

// interface StepData {
//   key: number;
//   step: number;
//   action: string;
//   minutes: number;
//   liters: number;
//   rpm: number;
//   chemicalName: string;
//   percentage: number;
//   dosage: number;
//   centigrade: number;
// }

// const columns: ColumnsType<StepData> = [
//   {
//     title: 'Step',
//     dataIndex: 'step',
//     key: 'step',
//   },
//   {
//     title: 'Action',
//     dataIndex: 'action',
//     key: 'action',
//   },
//   {
//     title: 'Minutes',
//     dataIndex: 'minutes',
//     key: 'minutes',
//   },
//   {
//     title: 'Liters',
//     dataIndex: 'liters',
//     key: 'liters',
//   },
//   {
//     title: 'RPM',
//     dataIndex: 'rpm',
//     key: 'rpm',
//   },
//   {
//     title: 'Chemical Name',
//     dataIndex: 'chemicalName',
//     key: 'chemicalName',
//     render: (text, record) => (
//       <Select defaultValue={text} style={{ width: 200 }} mode="multiple">
//         <Option value="Potassium Per Magnate">Potassium</Option>
//         <Option value="Another Chemical">Another</Option>
//       </Select>
//     ),
//   },
//   {
//     title: '%',
//     dataIndex: 'percentage',
//     key: 'percentage',
//     render: (text, record) => (
//       <InputNumber
//         min={0}
//         max={100}
//         defaultValue={text}
//       />
//     ),
//   },
//   {
//     title: 'Dosage',
//     dataIndex: 'dosage',
//     key: 'dosage',
//     render: (text, record) => <InputNumber min={0} style={{ width: 60 }} defaultValue={text} />,
//   },
//   {
//     title: 'Centigrade',
//     dataIndex: 'centigrade',
//     key: 'centigrade',
//     render: (text, record) => <InputNumber min={0} style={{ width: 60 }} defaultValue={text} />,
//   },
// ];

// const RecipeForm: React.FC = () => {
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [tableData, setTableData] = useState<StepData[]>([]);
//   const [uploadProgress, setUploadProgress] = useState<number>(0);
//   const [uploadTimer, setUploadTimer] = useState<NodeJS.Timeout | null>(null);
//   const [totalFiles, setTotalFiles] = useState<number>(0);

//   const showModal = () => {
//     setIsModalOpen(true);
//   };

//   const handleCancel = () => {
//     setIsModalOpen(false);
//     if (uploadTimer) {
//       clearInterval(uploadTimer);
//       setUploadTimer(null);
//     }
//     setUploadProgress(0); // Reset progress when modal is closed
//   };

//   const handleUpload = async (file: RcFile, totalFileCount: number) => {
//     const formData = new FormData();
//     formData.append('files', file);

//     // Simulate upload time
//     const uploadTimePerFile = 15970; // 15.97 seconds in milliseconds
//     const interval = 100; // Update every 100 milliseconds
//     const steps = uploadTimePerFile / interval;
//     const totalUploadTime = uploadTimePerFile * totalFileCount;
    
//     try {
//       setUploadProgress(0);
//       const timer = setInterval(() => {
//         setUploadProgress(prev => {
//           const nextProgress = Math.min(prev + (100 / steps / totalFileCount), 100);
//           if (nextProgress === 100) {
//             clearInterval(timer);
//           }
//           return nextProgress;
//         });
//       }, interval);
//       setUploadTimer(timer);

//       // Perform the actual file upload
//       const response = await axios.post('http://localhost:8000/uploadfile/', formData, {
//         headers: {
//           'Content-Type': 'multipart/form-data',
//         },
//       });

//       console.log('Server Response:', response.data);

//       if (response.data && Array.isArray(response.data.recipes)) {
//         setTableData(response.data.recipes);
//         console.log('Updated Table Data:', response.data.recipes);
//       } else {
//         console.error('Expected an array inside "recipes" but got:', response.data);
//         message.error('Unexpected response format');
//       }

//       message.success('File uploaded successfully');
//       setIsModalOpen(false);
//     } catch (error) {
//       console.error('Error uploading file:', error);
//       message.error('Error uploading file');
//     } finally {
//       setUploadProgress(100); // Ensure progress is completed in case of error
//       if (uploadTimer) {
//         clearInterval(uploadTimer);
//         setUploadTimer(null);
//       }
//     }
//   };

//   return (
//     <div>
//       <Row style={{ marginBottom: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
//         <Col>
//           <h1 style={{ color: '#343C6A', fontSize: "20px", fontWeight: "bold" }}>Recipe Form</h1>
//         </Col>
//         <Col>
//           <Button type="primary" style={{ backgroundColor: '#797FE7' }} onClick={showModal}>Upload Excel</Button>
//         </Col>
//       </Row>
//       <br />
//       <div style={{ padding: '20px', backgroundColor: 'white', borderRadius: '15px', margin: "auto" }}>
//         <Form layout="vertical">
//           <Row gutter={16}>
//             {/* First Row */}
//             <Col xs={24} md={12}>
//               <Form.Item label="Load Size" name="loadSize">
//                 <InputNumber style={{ width: '100%' }} />
//               </Form.Item>
//             </Col>
//             <Col xs={24} md={12}>
//               <Form.Item label="Machine Type" name="machineType">
//                 <Select placeholder="Select machine type" style={{ width: '100%' }} mode="multiple">
//                   <Option value="type1">Type 1</Option>
//                   <Option value="type2">Type 2</Option>
//                 </Select>
//               </Form.Item>
//             </Col>
//           </Row>
//           <Row gutter={16}>
//             {/* Second Row */}
//             <Col xs={24} md={12}>
//               <Form.Item label="Finish" name="finish">
//                 <Input style={{ width: '100%' }} />
//               </Form.Item>
//             </Col>
//             <Col xs={24} md={12}>
//               <Form.Item label="Recipe" name="recipe">
//                 <InputNumber style={{ width: '100%' }} />
//               </Form.Item>
//             </Col>
//           </Row>
//           <Row gutter={16}>
//             {/* Third Row */}
//             <Col xs={24} md={12}>
//               <Form.Item label="Fabric" name="fabric">
//                 <Input style={{ width: '100%' }} />
//               </Form.Item>
//             </Col>
//             <Col xs={24} md={12}>
//               <Form.Item label="FNO" name="fno">
//                 <InputNumber style={{ width: '100%' }} />
//               </Form.Item>
//             </Col>
//           </Row>
//         </Form>
//       </div>
//       <br />
//       <div style={{ backgroundColor: '#f5f5f5' }}>
//         <Row style={{ marginBottom: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
//           <Col>
//             <h1 style={{ color: '#343C6A', fontSize: '20px', fontWeight: 'bold' }}>Recipe Steps</h1>
//           </Col>
//           <Col>
//             <Button type="primary" style={{ backgroundColor: '#797FE7' }}>Add Steps+</Button>
//           </Col>
//         </Row>
//         <Modal
//           title="Upload File"
//           open={isModalOpen}
//           onCancel={handleCancel}
//           footer={null}
//           closeIcon={<Button onClick={handleCancel}>X</Button>}
//         >
//           <Upload
//             multiple
//             customRequest={({ file, onSuccess, onError }) => {
//               const fileList = Array.isArray(file) ? file : [file];
//               setTotalFiles(fileList.length);
//               Promise.all(fileList.map(file => {
//                 return handleUpload(file as RcFile, fileList.length);
//               })).then(() => {
//                 onSuccess?.({}, file);
//               }).catch(error => {
//                 onError?.(error);
//               });
//             }}
//             showUploadList={false}
//           >
//             <Button icon={<UploadOutlined />}>Choose Files</Button>
//           </Upload>
//           {uploadProgress > 0 && (
//             <div style={{ marginTop: '20px' }}>
//               <Progress percent={uploadProgress} />
//             </div>
//           )}
//         </Modal>
//         <div style={{ overflowX: 'auto' }}>
//           <Table
//             columns={columns}
//             dataSource={tableData} // Use tableData state here
//             pagination={false}
//             bordered={false}
//             style={{ backgroundColor: '#F5F5F5' }}
//             scroll={{ x: true }}
//           />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default RecipeForm;



"use client";

import React, { useState } from "react";
import { Form, Input, InputNumber, Select, Row, Col, Button, Table } from "antd";
import { ColumnsType } from "antd/es/table";
const { Option } = Select;

interface StepData {
  key: number;
  step: number;
  action: string;
  minutes: number;
  liters: number;
  rpm: number;
  chemicalName: string;
  percentage: number;
  dosage: number;
  centigrade: number;
}

const columns: ColumnsType<StepData> = [
  {
    title: 'Step',
    dataIndex: 'step',
    key: 'step',
  },
  {
    title: 'Action',
    dataIndex: 'action',
    key: 'action',
  },
  {
    title: 'Minutes',
    dataIndex: 'minutes',
    key: 'minutes',
  },
  {
    title: 'Liters',
    dataIndex: 'liters',
    key: 'liters',
  },
  {
    title: 'RPM',
    dataIndex: 'rpm',
    key: 'rpm',
  },
  {
    title: 'Chemical Name',
    dataIndex: 'chemicalName',
    key: 'chemicalName',
    render: (text, record) => (
      <Select defaultValue={text} style={{ width: 200 }} mode="multiple">
        <Option value="Potassium Per Magnate">Potassium</Option>
        <Option value="Another Chemical">Another</Option>
      </Select>
    ),
  },
  {
    title: '%',
    dataIndex: 'percentage',
    key: 'percentage',
    render: (text, record) => (
      <InputNumber
        min={0}
        max={100}
        defaultValue={text}
      />
    ),
  },
  {
    title: 'Dosage',
    dataIndex: 'dosage',
    key: 'dosage',
    render: (text, record) => <InputNumber min={0} style={{ width: 60 }} defaultValue={text} />,
  },
  {
    title: 'Centigrade',
    dataIndex: 'centigrade',
    key: 'centigrade',
    render: (text, record) => <InputNumber min={0} style={{ width: 60 }} defaultValue={text} />,
  },
];

const RecipeForm: React.FC = () => {
  const [tableData, setTableData] = useState<StepData[]>([]);

  const handleUploadSuccess = (data: any) => {
    setTableData(data);
  };

  return (
    <div>
      <Row style={{ marginBottom: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Col>
          <h1 style={{ color: '#343C6A', fontSize: "20px", fontWeight: "bold" }}>Recipe Form</h1>
        </Col>
        
      </Row>
      <br />
      <div style={{ padding: '20px', backgroundColor: 'white', borderRadius: '15px', margin: "auto" }}>
        <Form layout="vertical">
          <Row gutter={16}>
            {/* First Row */}
            <Col xs={24} md={12}>
              <Form.Item label="Load Size" name="loadSize">
                <InputNumber style={{ width: '100%' }} />
              </Form.Item>
            </Col>
            <Col xs={24} md={12}>
              <Form.Item label="Machine Type" name="machineType">
                <Select placeholder="Select machine type" style={{ width: '100%' }} mode="multiple">
                  <Option value="type1">Type 1</Option>
                  <Option value="type2">Type 2</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            {/* Second Row */}
            <Col xs={24} md={12}>
              <Form.Item label="Finish" name="finish">
                <Input style={{ width: '100%' }} />
              </Form.Item>
            </Col>
            <Col xs={24} md={12}>
              <Form.Item label="Recipe" name="recipe">
                <InputNumber style={{ width: '100%' }} />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            {/* Third Row */}
            <Col xs={24} md={12}>
              <Form.Item label="Fabric" name="fabric">
                <Input style={{ width: '100%' }} />
              </Form.Item>
            </Col>
            <Col xs={24} md={12}>
              <Form.Item label="FNO" name="fno">
                <InputNumber style={{ width: '100%' }} />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </div>
      <br />
      <div style={{ backgroundColor: '#f5f5f5' }}>
        <Row style={{ marginBottom: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Col>
            <h1 style={{ color: '#343C6A', fontSize: '20px', fontWeight: 'bold' }}>Recipe Steps</h1>
          </Col>
          <Col>
            <Button type="primary" style={{ backgroundColor: '#797FE7' }}>Add Steps+</Button>
          </Col>
        </Row>
        <div style={{ overflowX: 'auto' }}>
          <Table
            columns={columns}
            dataSource={tableData}
            pagination={false}
            bordered={false}
            style={{ backgroundColor: '#F5F5F5' }}
            scroll={{ x: true }}
          />
        </div>
      </div>
    </div>
  );
};

export default RecipeForm;
