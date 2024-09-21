"use client";

import React, { useState, useEffect, useRef } from 'react';
import { Modal, Form, Input, InputNumber, Select, Row, Col, Button, Table } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { usePathname } from 'next/navigation';
import type { DatePickerProps } from 'antd';
import { DatePicker, Space } from 'antd';
const { Option } = Select;

const NexusForm: React.FC = () => {
const [form] = Form.useForm();
const tableRef = useRef<any>(null);
const [tableData, setTableData] = useState<TableData[]>([]);
const [chemicalOptions, setChemicalOptions] = useState<string[]>([]);

const onChange: DatePickerProps['onChange'] = (date, dateString) => {
    console.log(date, dateString);
  };
    

  interface TableData {
    key: number;
    sno: number;
    poNumber: string;
    planHod: string;
    country: string;
    cartonQty: number;
    orderOty: number;
    ctnType:string;
    ctnCbm: string;
    gross: string;
    bookingStatus: string;
    bookingId: string;
    createdAt: string;
  }
  const capitalizeTitle = (title: string): string => {
    return title.replace(/\b\w/g, char => char.toUpperCase());
  };


  const columns: ColumnsType<TableData> = [
    {
      title: capitalizeTitle('SNo'),
      dataIndex: 'sno',
      key: 'sno',
    },
    {
      title: capitalizeTitle('PO Number'),
      dataIndex: 'poNumber',
      key: 'poNumber',
    },
    {
      title: capitalizeTitle('Plan Hod'),
      dataIndex: 'planHod',
      key: 'planHod',
    },
    {
      title: capitalizeTitle('Country'),
      dataIndex: 'country',
      key: 'country',
    },
    {
      title: capitalizeTitle('Carton Qty'),
      dataIndex: 'cartonQty',
      key: 'cartonQty',
    },
    {
      title: capitalizeTitle('Order Qty'),
      dataIndex: 'orderOty',
      key: 'orderOty',
    },
    {
      title: capitalizeTitle('CTN Type'),
      dataIndex: 'ctnType',
      key: 'ctnType',
    },
    {
      title: capitalizeTitle('CTN CBM'),
      dataIndex: 'ctnCbm',
      key: 'ctnCbm',
    },
    {
      title: capitalizeTitle('Gross'),
      dataIndex: 'gross',
      key: 'gross',
    },
    {
      title: capitalizeTitle('Booking Status'),
      dataIndex: 'bookingStatus',
      key: 'bookingStatus',
    },
    {
      title: capitalizeTitle('Booking ID'),
      dataIndex: 'bookingId',
      key: 'bookingId',
    },
    {
      title: capitalizeTitle('Created At'),
      dataIndex: 'createdAt',
      key: 'createdAt',
    },
  ];

  return (  <div>
          <Row style={{ marginBottom: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Col>
          <h1 style={{ color: '#343C6A', fontSize: "20px", fontWeight: "bold" }}> Filters</h1>
        </Col>

      </Row>
      <br />

      <div style={{ padding: '20px', backgroundColor: 'white', borderRadius: '15px', margin: "auto" }}>
        <Form form={form} layout="vertical">
          <Row gutter={16}>

            <Col xs={24} md={12}>
              <Form.Item label="From" name="from">
              <Space direction="vertical" style={{ width: '100%' }}>
    <DatePicker onChange={onChange}
        placeholder="dd/mm/yyyy"
        style={{ width: '100%' }} 
    />
     </Space>

              </Form.Item>
            </Col>

            <Col  xs={24} md={12} >
              <Form.Item label="To" name="to">
              <Space direction="vertical" style={{ width: '100%' }}>
    <DatePicker onChange={onChange} 
    placeholder="dd/mm/yyyy"
    style={{ width: '100%' }} 

    />
     </Space>
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
           
            <Col xs={24} md={12}>
              <Form.Item label="Search" name="search">
              <Input style={{ width: '100%' }} />
              </Form.Item>
            </Col>
            <Col>
          <Button type="primary" style={{ marginTop: '40%', backgroundColor: '#797FE7', borderRadius: '100px'}} >Search</Button>
        </Col>
          </Row>
         
        </Form>
        <br />
      </div>

      <Row style={{ marginTop: '20px', marginBottom: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Col>
          <h1 style={{ color: '#343C6A', fontSize: "20px", fontWeight: "bold" }}> Nexus Data</h1>
        </Col>
        <Col>
          <Button type="primary" style={{ backgroundColor: '#797FE7', borderRadius: '100px'}}>Download</Button>
        </Col>
      </Row>

{/* Table */}


<div style={{ padding: '20px', backgroundColor: 'white', borderRadius: '15px', }}>
          <Table
            ref={tableRef}
            columns={columns}
            dataSource={tableData}
            pagination={false}
            scroll={{ x: 'max-content' }}

          />
        </div>




  </div>

  );
};          

export default NexusForm;
