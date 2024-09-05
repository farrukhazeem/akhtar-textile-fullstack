"use client";

import React, { useState, useEffect, useRef } from 'react';
import { Modal, Form, Input, InputNumber, Select, Row, Col, Button, Table } from 'antd';
import { ColumnsType } from 'antd/es/table';
import UploadData from '@/components/UploadData/uploadData'; 
import SaveData from '@/components/SaveData/saveData';
import { usePathname } from 'next/navigation';

const { Option } = Select;

const RecipeForm: React.FC = () => {
  const pathname = usePathname();
  const [chemicalOptions, setChemicalOptions] = useState<string[]>([]);
  const [tableData, setTableData] = useState<StepData[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();
  const [recipe1, setRecipe1] = useState<any>({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
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
          {chemicalOptions.map(option => (
            <Option key={option} value={option}>{option}</Option>
          ))}
        </Select>
      ),
    },
    {
      title: '%',
      dataIndex: 'percentage',
      key: 'percentage',
      render: (text) => (
        <InputNumber
          min={0}
          max={100}
          defaultValue={text[0]}
          style={{ width: '100%' }}
        />
      ),
    },
    {
      title: 'Dosage',
      dataIndex: 'dosage',
      key: 'dosage',
      render: (text) => (
        <InputNumber
          min={0}
          defaultValue={text[0]}
          style={{ width: 60 }}
        />
      ),
    },
    {
      title: 'Centigrade',
      dataIndex: 'centigrade',
      key: 'centigrade',
      render: (text) => (
        <InputNumber
          min={0}
          defaultValue={text}
          style={{ width: 60 }}
        />
      ),
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

  useEffect(() => {
    const fetchRecipe = async (id: string) => {
      setLoading(true);
      try {
        const response = await fetch(`/api/getRecipeDetails/${id}`);
        const data = await response.json();
  
        // Debugging: Log the fetched data
        console.log('Fetched Data:', data);
  
        if (response.ok) {
          setRecipe1(data);

          console.log(">>>>", data)
  
          // Set form values using the fetched recipe data
          form.setFieldsValue({
            loadSize: data.load_size,
            machineType: data.machine_type,
            finish: data.finish,
            recipe: data.recipe,
            fabric: data.fabric,
            fno: data.fno,
          });
  
          // Transform the data to extract steps and their associated chemicals
          const stepsMap: { [key: number]: StepData } = {};
  
          // Check if data is an array
          if (Array.isArray(data)) {
            data.forEach((row: any) => {
              // Debugging: Log each row being processed
              console.log('Processing Row:', row);
  
              if (!stepsMap[row.step_id]) {
                stepsMap[row.step_id] = {
                  key: row.step_id,
                  step: row.step_id,
                  action: row.action,
                  minutes: row.minutes || 0,
                  liters: row.liters || 0,
                  rpm: row.rpm || 0,
                  centigrade: row.centigrade || 0,
                  chemicalName: [],
                  percentage: [],
                  dosage: [],
                };
              }
  
              // Add the chemical association data to the step
              stepsMap[row.step_id].chemicalName.push(row.chemical_name);
              stepsMap[row.step_id].percentage.push(row.percentage);
              stepsMap[row.step_id].dosage.push(row.dosage);
            });
  
            // Convert the stepsMap to an array for the table
            const formattedSteps = Object.values(stepsMap);
  
            // Debugging: Log the formatted steps
            console.log('Formatted Steps for Table:', formattedSteps);
  
            setTableData(formattedSteps);
          } else {
            setError('Data is not in the expected format');
          }
        } else {
          setError(data.message || 'Error fetching recipe');
        }
      } catch (err) {
        console.error('Error:', err);
        setError('Error fetching recipe');
      } finally {
        setLoading(false);
      }
    };
  
    const id = pathname?.split('/').pop();
    if (id) {
      fetchRecipe(id);
    }
  }, [pathname, form]);
  
  
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
