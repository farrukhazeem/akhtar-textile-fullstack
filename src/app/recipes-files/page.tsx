"use client";

import React, { useState } from "react";
import { Modal, Upload, Button, Progress, message, Card, Col, Row } from "antd";
import { UploadOutlined } from '@ant-design/icons';
import axios from 'axios';
import type { RcFile } from 'antd/es/upload/interface';

const RecipeFiles: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [fileNames, setFileNames] = useState<string[]>([]);
  const [data, setData] = useState(null)

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);

  };

  const handleUpload = async (file: RcFile) => {
    
    const formData = new FormData();
    formData.append('files', file);

    try {


      

      // Perform the actual file upload
      const response = await axios.post('http://localhost:8000/uploadfile/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setData(response.data)
      console.log('Server Response:', response.data);
      message.success('File uploaded successfully');
      setIsModalOpen(false);
    } catch (error) {
      console.error('Error uploading file:', error);
      message.error('Error uploading file');
    } 
  };

  return (
    <>
    <div>
      {data? <span>{data.recipes[0].file_name}</span> : <span>Loading...</span>}
    </div>
      <Button type="primary" style={{ backgroundColor: '#797FE7' }} onClick={showModal}>Upload Excel</Button>
      <Modal
        title="Upload File"
        open={isModalOpen}
        onCancel={handleCancel}
        footer={null}
        closeIcon={<Button onClick={handleCancel}>X</Button>}
      >
        <Upload
            customRequest={({ file, onSuccess, onError }) => {
              const rcFile = file as RcFile;

              handleUpload(rcFile)
                .then(() => {
                  console.log("File has been uploaded", rcFile);

                  // Add the uploaded file name to the state
                  setFileNames((prevNames) => [...prevNames, rcFile.name]);

                })
                .catch((error) => {
                  onError?.(error);
                });
            }}
            showUploadList={false}
          >
          <Button icon={<UploadOutlined />}>Choose Files</Button>
        </Upload>



      </Modal>
      <div style={{ marginTop: '20px' }}>
        <Row gutter={[16, 16]}>
          {fileNames.map((fileName, index) => (
            <Col xs={24} sm={12} md={8} lg={6} key={index}>
              <Card style={{ width: 200, textAlign: 'center', border: '1px solid #ddd' }}>
                <p>{fileName}</p>
              </Card>
            </Col>
          ))}
        </Row>
      </div>

    </>
  );
};

export default RecipeFiles;
