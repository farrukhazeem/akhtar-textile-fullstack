"use client";

import React, { useState } from "react";
import { Modal, Upload, Button, Progress, message, Card, Col, Row } from "antd";
import { UploadOutlined } from '@ant-design/icons';
import axios from 'axios';
import type { RcFile } from 'antd/es/upload/interface';

const Recipe: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
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

    </>
  );
};

export default Recipe ;
