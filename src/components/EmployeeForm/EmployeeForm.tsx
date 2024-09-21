"use client";

import React, { useState } from 'react';
import { Form, Input, Select, Row, Col, Button, message } from 'antd';

const { Option } = Select;

interface EmployeeFormProps {
  setIsModalVisible: (visible: boolean) => void;
  onSuccess: () => void;
}

const EmployeeForm: React.FC<EmployeeFormProps> = ({ setIsModalVisible,onSuccess }) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false); // Loader state

  const onFinish = async (values: any) => {
    setLoading(true); // Start loading
    try {
      const response = await fetch('/api/createUser', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });

      if (response.ok) {
        message.success('Employee created successfully.');
        form.resetFields(); 
        onSuccess(); 
        // Optional: Reset form after success
        setIsModalVisible(false);
         // Close modal after success
      } else {
        const error = await response.json();
        message.error('Employee creation failed. Please try again.');
      }
    } catch (error) {
      console.error('Error creating user:', error);
      message.error('Error creating employee. Please try again.');
    } finally {
      setLoading(false); // Stop loading
    }
  };

  return (
    <Form form={form} layout="vertical" onFinish={onFinish}>
      {/* Your form fields here */}
      <Row gutter={16}>
          <Col xs={24} md={8}>
            <Form.Item label="Name" name="name">
              <Input style={{ width: '100%' }} />
            </Form.Item>
          </Col>
          <Col xs={24} md={8}>
            <Form.Item label="Department" name="department">
              <Select placeholder="Select Department" style={{ width: '100%' }}>
                <Option value="Accounts">Accounts</Option>
                <Option value="Operations">Operations</Option>
              </Select>
            </Form.Item>
          </Col>
          <Col xs={24} md={8}>
            <Form.Item label="User Name" name="username">
              <Input style={{ width: '100%' }} />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col xs={24} md={8}>
            <Form.Item label="CNIC" name="cnic">
              <Input style={{ width: '100%' }} />
            </Form.Item>
          </Col>
          <Col xs={24} md={8}>
            <Form.Item label="Designation" name="designation">
              <Select placeholder="Select Designation" style={{ width: '100%' }}>
                <Option value="Manager">Manager</Option>
                <Option value="Admin">Admin</Option>
              </Select>
            </Form.Item>
          </Col>
          <Col xs={24} md={8}>
            <Form.Item label="Password" name="password">
              <Input style={{ width: '100%' }} />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col xs={24} md={8}>
            <Form.Item label="Employee Code" name="code">
              <Input style={{ width: '100%' }} />
            </Form.Item>
          </Col>
          <Col xs={24} md={8}>
            <Form.Item label="Manager" name="manager">
              <Select placeholder="Select Manager" style={{ width: '100%' }}>
                <Option value="Saad">Saad</Option>
                <Option value="Farrukh">Farrukh</Option>
              </Select>
            </Form.Item>
          </Col>
          <Col xs={24} md={8}>
            <Form.Item label="Bank" name="bank">
              <Input style={{ width: '100%' }} />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col xs={24} md={8}>
            <Form.Item label="Phone #" name="phone">
              <Input style={{ width: '100%' }} />
            </Form.Item>
          </Col>
          <Col xs={24} md={8}>
            <Form.Item label="Provide Access" name="access">
              <Select placeholder="Select Access" style={{ width: '100%' }}>
                <Option value="Admin">Admin</Option>
                <Option value="User">User</Option>
              </Select>
            </Form.Item>
          </Col>
          <Col xs={24} md={8}>
            <Form.Item label="Account #" name="account">
              <Input style={{ width: '100%' }} />
            </Form.Item>
          </Col>
        </Row>
      <Button
        type="primary"
        htmlType="submit"
        loading={loading} // Loader when submitting
        disabled={loading} // Disable button while loading
        style={{ backgroundColor: '#797FE7', color: '#ffffff', borderRadius: '100px' }}
        className="mt-10 px-4 py-2 rounded-sm hover:bg-blue-600 rounded-2xl"
      >
        Submit
      </Button>
    </Form>
  );
};

export default EmployeeForm;
