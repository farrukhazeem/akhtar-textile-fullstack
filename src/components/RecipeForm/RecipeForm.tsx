"use client";
// RecipeForm.tsx
import React, { useState, useRef } from 'react';
import { Modal, Form, Input, InputNumber, Select, Row, Col, Button, Table } from 'antd';
import { ColumnsType } from 'antd/es/table';
import UploadData from '@/components/UploadData/uploadData'; 
import SaveData from '@/components/SaveData/saveData';
const { Option } = Select;

const RecipeForm: React.FC = () => {
  const [chemicalOptions, setChemicalOptions] = useState<string[]>([]);
  const [tableData, setTableData] = useState<StepData[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();
  const [recipe1, setRecipe1] = useState<any>({});
  const tableRef = useRef<any>(null);

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
          <Option key="NO STONT" value="NO STONT">NO STONT</Option>
          <Option key="Imacol" value="Imacol">Imacol</Option>
          <Option key="ABS" value="ABS">ABS</Option>
          <Option key="HTL" value="HTL">HTL</Option>
          <Option key="Power Wash Total AK NEW" value="Power Wash Total AK NEW">Power Wash Total AK NEW</Option>
          <Option key="Caustic" value="Caustic">Caustic</Option>
          <Option key="Hypo" value="Hypo">Hypo</Option>
          <Option key="Meta" value="Meta">Meta</Option>
          <Option key="Potassium Per Magnate" value="Potassium Per Magnate">Potassium Per Magnate</Option>
          <Option key="Red A" value="Red A">Red A</Option>
          <Option key="Brown" value="Brown">Brown</Option>
          <Option key="WD" value="WD">WD</Option>
          <Option key="Salt" value="Salt">Salt</Option>
          <Option key="Softouch OET" value="Softouch OET">Softouch OET</Option>

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
      render: (text) => <InputNumber min={0} style={{ width: 60 }} defaultValue={text} />,
    },
    {
      title: 'Centigrade',
      dataIndex: 'centigrade',
      key: 'centigrade',
      render: (text) => <InputNumber min={0} style={{ width: 60 }} defaultValue={text} />,
    },
  ];

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const addStep = () => {
    const newStep: StepData = {
      key: tableData.length + 1,
      step: 0,
      action: '',
      minutes: 0,
      liters: 0,
      rpm: 0,
      chemicalName: [''],
      percentage: [0],
      dosage: [0],
      centigrade: 0,
    };
    setTableData([...tableData, newStep]);
  };

  return (
    <div>
      <Row style={{ marginBottom: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Col>
          <h1 style={{ color: '#343C6A', fontSize: "20px", fontWeight: "bold" }}>Recipe Form</h1>
        </Col>
        <Col>
          <Button type="primary" style={{ backgroundColor: '#797FE7' }} onClick={showModal}>Upload Excel</Button>
        </Col>
      </Row>
      <br />
      <div style={{ padding: '20px', backgroundColor: 'white', borderRadius: '15px', margin: "auto" }}>
      <Form form={form} layout="vertical">
          <Row gutter={16}>
            <Col xs={24} md={12}>
              <Form.Item label="Load Size" name="loadSize">
                <InputNumber style={{ width: '100%' }} />
              </Form.Item>
            </Col>
            <Col xs={24} md={12}>
              <Form.Item label="Machine Type" name="machineType">
                <Select placeholder="Select machine type" style={{ width: '100%' }}>
                  <Option value="UP SYSTEM">UP SYSTEM</Option>
                  <Option value="type2">Type 2</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
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
        <br />
        <SaveData form={form} tableData={tableData} recipe1={recipe1} />
      </div>
      <br />
      <div style={{ backgroundColor: '#f5f5f5' }}>
        <Row style={{ marginBottom: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Col>
            <h1 style={{ color: '#343C6A', fontSize: '20px', fontWeight: 'bold' }}>Recipe Steps</h1>
          </Col>
          <Col>
            <Button type="primary" style={{ backgroundColor: '#797FE7' }} onClick={addStep}>Add Step</Button>
          </Col>
        </Row>
        <div style={{ padding: '20px', backgroundColor: 'white', borderRadius: '15px' }}>
          <Table
            ref={tableRef}
            columns={columns}
            dataSource={tableData}
            pagination={false}
            bordered
            style={{ width: '100%' }}
          />
        </div>
      </div>
      <Modal
        title="Upload Excel File"
        open={isModalOpen}
        onCancel={handleCancel}
        footer={null}
      >
        <UploadData
          setTableData={setTableData}
          setChemicalOptions={setChemicalOptions}
          setIsModalOpen={setIsModalOpen}
          form={form}
          setRecipe1={setRecipe1}
        />
      </Modal>
    </div>
  );
};

export default RecipeForm;
