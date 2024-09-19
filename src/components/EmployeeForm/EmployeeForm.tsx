"use client";

import React, { useState, useEffect, useRef } from 'react';
import {  Form, Input, Select, Row, Col, Button,  } from 'antd';
import { message } from 'antd';
import { useRouter } from 'next/navigation'; 

const { Option } = Select;

const EmployeeForm: React.FC = () => {
    const [form] = Form.useForm();

    const onFinish = async (values: any) => {
        try {
            
            const response = await fetch('/api/createUser', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(values),
            });
            // console.log("response",response)
      
            if (response.ok) {
              const result = await response.json();
              message.success('Employee created successfully.'); 
              
             
            } else {
              const error = await response.json();
              message.error('Employee creation failed. Please try again.'); 

            }
          } catch (error) {
            console.error('Error creating user:', error);
          }
    };

    return (      
    <div style={{ padding: '20px', backgroundColor: 'white', borderRadius: '15px', margin: "auto" }}>
        <Form form={form} layout="vertical" onFinish={onFinish}>
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

     
          <button
                type="submit"
                style={{ backgroundColor: '#797FE7', color: '#ffffff' ,borderRadius: '100px'}}
                className="mt-10 px-4 py-2 rounded-sm hover:bg-blue-600 rounded-2xl"
            >
                Submit
            </button>
        </Form>

   
        <br />
      </div>
      )

}

export default EmployeeForm;
