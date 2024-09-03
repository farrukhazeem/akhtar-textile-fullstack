  // // "use client";

  // // import React, { useState, useEffect } from "react";
  // // import { Modal, Upload, Form, Input, InputNumber, Select, Row, Col, Button, Table, message } from "antd";
  // // import { ColumnsType } from "antd/es/table";
  // // import { UploadOutlined } from '@ant-design/icons';
  // // import type { RcFile } from 'antd/es/upload/interface';
  // // import axios from "axios";

  // // const { Option } = Select;

  // // // State for chemical options inside the component
  // // const RecipeForm: React.FC = () => {
  // //   const [chemicalOptions, setChemicalOptions] = useState<string[]>([]); // State for chemical options
  // //   const [tableData, setTableData] = useState<StepData[]>([]);
  // //   const [isModalOpen, setIsModalOpen] = useState(false);
  // //   const [data, setData] = useState<any>(null);

  // //   interface StepData {
  // //     key: number;
  // //     step: number;
  // //     action: string;
  // //     minutes: number;
  // //     liters: number;
  // //     rpm: number;
  // //     chemicalName: string;
  // //     percentage: number;
  // //     dosage: number;
  // //     centigrade: number;
  // //   }

  // //   // Columns definition with dynamic chemical options
  // //   const columns: ColumnsType<StepData> = [
  // //     {
  // //       title: 'Step',
  // //       dataIndex: 'step',
  // //       key: 'step',
  // //     },
  // //     {
  // //       title: 'Action',
  // //       dataIndex: 'action',
  // //       key: 'action',
  // //     },
  // //     {
  // //       title: 'Minutes',
  // //       dataIndex: 'minutes',
  // //       key: 'minutes',
  // //     },
  // //     {
  // //       title: 'Liters',
  // //       dataIndex: 'liters',
  // //       key: 'liters',
  // //     },
  // //     {
  // //       title: 'RPM',
  // //       dataIndex: 'rpm',
  // //       key: 'rpm',
  // //     },
  // //     {
  // //       title: 'Chemical Name',
  // //       dataIndex: 'chemicalName',
  // //       key: 'chemicalName',
  // //       render: (text, record) => (
  // //         <Select defaultValue={text} style={{ width: 200 }} mode="multiple">
  // //           {chemicalOptions.map(chemical => (
  // //             <Option value={chemical.recipe_name}>{chemical.recipe_name}</Option>
  // //           ))}
  // //         </Select>
  // //       ),
  // //     },
  // //     {
  // //       title: '%',
  // //       dataIndex: 'percentage',
  // //       key: 'percentage',
  // //       render: (text, record) => (
  // //         <InputNumber
  // //           min={0}
  // //           max={100}
  // //           defaultValue={text}
  // //         />
  // //       ),
  // //     },
  // //     {
  // //       title: 'Dosage',
  // //       dataIndex: 'dosage',
  // //       key: 'dosage',
  // //       render: (text) => <InputNumber min={0} style={{ width: 60 }} defaultValue={text} />,
  // //     },
  // //     {
  // //       title: 'Centigrade',
  // //       dataIndex: 'centigrade',
  // //       key: 'centigrade',
  // //       render: (text) => <InputNumber min={0} style={{ width: 60 }} defaultValue={text} />,
  // //     },
  // //   ];

  // //   const showModal = () => {
  // //     setIsModalOpen(true);
  // //   };

  // //   const handleCancel = () => {
  // //     setIsModalOpen(false);
  // //   };

  // //   const handleUpload = async (file: RcFile) => {
  // //     const formData = new FormData();
  // //     formData.append('files', file);

  // //     try {
  // //       const response = await axios.post('http://localhost:8000/uploadfile/', formData, {
  // //         headers: {
  // //           'Content-Type': 'multipart/form-data',
  // //         },
  // //       });

  // //       setChemicalOptions(response.data.recipes[0].step[0].chemicals); // Set chemical options dynamically
  // //       console.log(response.data.recipes[0].step.chemicals)
  // //       const recipesData = response.data.recipes[0].step.map((recipe: any, index: number) => ({
  // //         key: index,
  // //         step: recipe.step_no,
  // //         action: recipe.action,
  // //         minutes: recipe.minutes,
  // //         liters: recipe.litres,
  // //         rpm: recipe.rpm,
  // //         chemicalName: recipe.chemicals,
  // //         percentage: recipe.chemicals.percentage,
  // //         dosage: recipe.chemicals.dosage,
  // //         centigrade: recipe.temperature,
  // //       }));

  // //       setTableData(recipesData);
  // //       setData(response.data);
  // //       console.log('Server Response:', response.data.recipes);
  // //       message.success('File uploaded successfully');
  // //       setIsModalOpen(false);
  // //     } catch (error) {
  // //       console.error('Error uploading file:', error);
  // //       message.error('Error uploading file');
  // //     }
  // //   };

  // //   return (
  // //     <div>
  // //       <Row style={{ marginBottom: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
  // //         <Col>
  // //           <h1 style={{ color: '#343C6A', fontSize: "20px", fontWeight: "bold" }}>Recipe Form</h1>
  // //         </Col>
  // //         <Col>
  // //           <Button type="primary" style={{ backgroundColor: '#797FE7' }} onClick={showModal}>Upload Excel</Button>
  // //         </Col>
  // //       </Row>
  // //       <br />
  // //       <div style={{ padding: '20px', backgroundColor: 'white', borderRadius: '15px', margin: "auto" }}>
  // //         <Form layout="vertical">
  // //           <Row gutter={16}>
  // //             {/* First Row */}
  // //             <Col xs={24} md={12}>
  // //               <Form.Item label="Load Size" name="loadSize">
  // //                 <InputNumber style={{ width: '100%' }} />
  // //               </Form.Item>
  // //             </Col>
  // //             <Col xs={24} md={12}>
  // //               <Form.Item label="Machine Type" name="machineType">
  // //                 <Select placeholder="Select machine type" style={{ width: '100%' }} mode="multiple">
  // //                   <Option value="type1">Type 1</Option>
  // //                   <Option value="type2">Type 2</Option>
  // //                 </Select>
  // //               </Form.Item>
  // //             </Col>
  // //           </Row>
  // //           <Row gutter={16}>
  // //             {/* Second Row */}
  // //             <Col xs={24} md={12}>
  // //               <Form.Item label="Finish" name="finish">
  // //                 <Input style={{ width: '100%' }} />
  // //               </Form.Item>
  // //             </Col>
  // //             <Col xs={24} md={12}>
  // //               <Form.Item label="Recipe" name="recipe">
  // //                 <InputNumber style={{ width: '100%' }} />
  // //               </Form.Item>
  // //             </Col>
  // //           </Row>
  // //           <Row gutter={16}>
  // //             {/* Third Row */}
  // //             <Col xs={24} md={12}>
  // //               <Form.Item label="Fabric" name="fabric">
  // //                 <Input style={{ width: '100%' }} />
  // //               </Form.Item>
  // //             </Col>
  // //             <Col xs={24} md={12}>
  // //               <Form.Item label="FNO" name="fno">
  // //                 <InputNumber style={{ width: '100%' }} />
  // //               </Form.Item>
  // //             </Col>
  // //           </Row>
  // //         </Form>
  // //       </div>
  // //       <br />
  // //       <div style={{ backgroundColor: '#f5f5f5' }}>
  // //         <Row style={{ marginBottom: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
  // //           <Col>
  // //             <h1 style={{ color: '#343C6A', fontSize: '20px', fontWeight: 'bold' }}>Recipe Steps</h1>
  // //           </Col>
  // //           <Col>
  // //             <Button type="primary" style={{ backgroundColor: '#797FE7' }}>Add Steps+</Button>
  // //           </Col>
  // //         </Row>
  // //         <div style={{ overflowX: 'auto' }}>
  // //           <Table
  // //             columns={columns}
  // //             dataSource={tableData}
  // //             pagination={false}
  // //             bordered={false}
  // //             style={{ backgroundColor: '#F5F5F5' }}
  // //             scroll={{ x: true }}
  // //           />
  // //         </div>
  // //       </div>

  // //       <Modal
  // //         title="Upload File"
  // //         open={isModalOpen}
  // //         onCancel={handleCancel}
  // //         footer={null}
  // //         closeIcon={<Button onClick={handleCancel}>X</Button>}
  // //       >
  // //         <Upload
  // //           customRequest={({ file, onSuccess, onError }) => {
  // //             const rcFile = file as RcFile;

  // //             handleUpload(rcFile)
  // //               .then(() => {
  // //                 console.log("File has been uploaded", rcFile);
  // //               })
  // //               .catch((error) => {
  // //                 onError?.(error);
  // //               });
  // //           }}
  // //           showUploadList={false}
  // //         >
  // //           <Button icon={<UploadOutlined />}>Choose Files</Button>
  // //         </Upload>
  // //       </Modal>
  // //     </div>
  // //   );
  // // };

  // // export default RecipeForm;


  // "use client";

  // import React, { useState, useEffect } from "react";
  // import { Modal, Upload, Form, Input, InputNumber, Select, Row, Col, Button, Table, message } from "antd";
  // import { ColumnsType } from "antd/es/table";
  // import { UploadOutlined } from '@ant-design/icons';
  // import type { RcFile } from 'antd/es/upload/interface';
  // import axios from "axios";

  // const { Option } = Select;

  // // State for chemical options inside the component
  // const RecipeForm: React.FC = () => {
  //   const [chemicalOptions, setChemicalOptions] = useState<string[]>([]); // State for chemical options
  //   const [tableData, setTableData] = useState<StepData[]>([]);
  //   const [isModalOpen, setIsModalOpen] = useState(false);
  //   const [data, setData] = useState<any>(null);
  //   const [form] = Form.useForm();

  //   interface StepData {
  //     key: number;
  //     step: number;
  //     action: string;
  //     minutes: number;
  //     liters: number;
  //     rpm: number;
  //     chemicalName: string;
  //     percentage: number;
  //     dosage: number;
  //     centigrade: number;
  //   }

  //   // Columns definition with dynamic chemical options
  //   const columns: ColumnsType<StepData> = [
  //     {
  //       title: 'Step',
  //       dataIndex: 'step',
  //       key: 'step',
  //     },
  //     {
  //       title: 'Action',
  //       dataIndex: 'action',
  //       key: 'action',
  //     },
  //     {
  //       title: 'Minutes',
  //       dataIndex: 'minutes',
  //       key: 'minutes',
  //     },
  //     {
  //       title: 'Liters',
  //       dataIndex: 'liters',
  //       key: 'liters',
  //     },
  //     {
  //       title: 'RPM',
  //       dataIndex: 'rpm',
  //       key: 'rpm',
  //     },
  //     {
  //       title: 'Chemical Name',
  //       dataIndex: 'chemicalName',
  //       key: 'chemicalName',
  //       render: (text, record) => (
  //         <Select defaultValue={text} style={{ width: 200 }} mode="multiple">
  //           {chemicalOptions.map(chemical => (
  //             <Option value={chemical.recipe_name}>{chemical.recipe_name}</Option>
  //           ))}
  //         </Select>
  //       ),
  //     },
  //     {
  //       title: '%',
  //       dataIndex: 'percentage',
  //       key: 'percentage',
  //       render: (text, record) => (
  //         <InputNumber
  //           min={0}
  //           max={100}
  //           defaultValue={text}
  //         />
  //       ),
  //     },
  //     {
  //       title: 'Dosage',
  //       dataIndex: 'dosage',
  //       key: 'dosage',
  //       render: (text) => <InputNumber min={0} style={{ width: 60 }} defaultValue={text} />,
  //     },
  //     {
  //       title: 'Centigrade',
  //       dataIndex: 'centigrade',
  //       key: 'centigrade',
  //       render: (text) => <InputNumber min={0} style={{ width: 60 }} defaultValue={text} />,
  //     },
  //   ];

  //   const showModal = () => {
  //     setIsModalOpen(true);
  //   };

  //   const handleCancel = () => {
  //     setIsModalOpen(false);
  //   };
  //   const handleUpload = async (file) => {
  //     const formData = new FormData();
  //     formData.append('files', file);

  //     try {
  //       const response = await axios.post('http://localhost:8000/uploadfile/', formData, {
  //         headers: {
  //           'Content-Type': 'multipart/form-data',
  //         },
  //       });

  //       const recipe = response.data.recipes[0];
  //       console.log("respnose ===> ", response.data.recipes[0].step[0].temperature)

  //       const recipesData = response.data.recipes[0].step.map((recipe: any, index: number) => ({
  //         key: index,
  //         step: recipe.step_no,
  //         action: recipe.action,
  //         minutes: recipe.minutes,
  //         liters: recipe.litres,
  //         rpm: recipe.rpm,
  //         chemicalName: recipe.chemicals,
  //         percentage: recipe.chemicals.percentage,
  //         dosage: recipe.chemicals.dosage,
  //         centigrade: recipe.temperature,
  //       }));

  //       setTableData(recipesData);

  //       // Set form values with the recipe data
  //       form.setFieldsValue({
  //         loadSize: recipe.load_size,
  //         machineType: recipe.machine_type,
  //         finish: recipe.finish,
  //         recipe: recipe.recipe_no,
  //         fabric: recipe.fabric,
  //         fno: recipe.Fno,
  //       });
  //       console.log()
  //       message.success('File uploaded successfully');
  //       setIsModalOpen(false);
  //     } catch (error) {
  //       console.error('Error uploading file:', error);
  //       message.error('Error uploading file');
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
  //         <Form form={form} layout="vertical">
  //           <Row gutter={16}>
  //             <Col xs={24} md={12}>
  //               <Form.Item label="Load Size" name="loadSize">
  //                 <InputNumber style={{ width: '100%' }} />
  //               </Form.Item>
  //             </Col>
  //             <Col xs={24} md={12}>
  //               <Form.Item label="Machine Type" name="machineType">
  //                 <Select placeholder="Select machine type" style={{ width: '100%' }}>
  //                   <Option value="UP SYSTEM">UP SYSTEM</Option>
  //                   <Option value="type2">Type 2</Option>
  //                 </Select>
  //               </Form.Item>
  //             </Col>
  //           </Row>
  //           <Row gutter={16}>
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
  //         <div style={{ overflowX: 'auto' }}>
  //           <Table
  //             columns={columns}
  //             dataSource={tableData}
  //             pagination={false}
  //             bordered={false}
  //             style={{ backgroundColor: '#F5F5F5' }}
  //             scroll={{ x: true }}
  //           />
  //         </div>
  //       </div>

  //       <Modal
  //         title="Upload File"
  //         open={isModalOpen}
  //         onCancel={handleCancel}
  //         footer={null}
  //       >
  //         <Upload
  //           customRequest={({ file, onError }) => {
  //             handleUpload(file)
  //               .then(() => {
  //                 console.log("File has been uploaded", file);
  //               })
  //               .catch((error) => {
  //                 onError?.(error);
  //               });
  //           }}
  //           showUploadList={false}
  //         >
  //           <Button icon={<UploadOutlined />}>Choose Files</Button>
  //         </Upload>
  //       </Modal>
  //     </div>
  //   );
  // };

  // export default RecipeForm;



  // "use client";

  // import React, { useState, useRef } from "react";
  // import { Modal, Upload, Form, Input, InputNumber, Select, Row, Col, Button, Table, message } from "antd";
  // import { ColumnsType } from "antd/es/table";
  // import { UploadOutlined } from '@ant-design/icons';
  // import axios from "axios";

  // const { Option } = Select;

  // const RecipeForm: React.FC = () => {
  //   const [chemicalOptions, setChemicalOptions] = useState<string[]>([]);
  //   const [tableData, setTableData] = useState<StepData[]>([]);
  //   const [isModalOpen, setIsModalOpen] = useState(false);
  //   const [form] = Form.useForm();
    
  //   const tableRef = useRef<any>(null); // Reference to the table

  //   interface StepData {
  //     key: number;
  //     step: number;
  //     action: string;
  //     minutes: number;
  //     liters: number;
  //     rpm: number;
  //     chemicalName: string;
  //     percentage: number;
  //     dosage: number;
  //     centigrade: number;
  //   }

  //   const columns: ColumnsType<StepData> = [
  //     {
  //       title: 'Step',
  //       dataIndex: 'step',
  //       key: 'step',
  //     },
  //     {
  //       title: 'Action',
  //       dataIndex: 'action',
  //       key: 'action',
  //     },
  //     {
  //       title: 'Minutes',
  //       dataIndex: 'minutes',
  //       key: 'minutes',
  //     },
  //     {
  //       title: 'Liters',
  //       dataIndex: 'liters',
  //       key: 'liters',
  //     },
  //     {
  //       title: 'RPM',
  //       dataIndex: 'rpm',
  //       key: 'rpm',
  //     },
  //     {
  //       title: 'Chemical Name',
  //       dataIndex: 'chemicalName',
  //       key: 'chemicalName',
  //       render: (text, record) => (
          
  //         <Select defaultValue={text} style={{ width: 200 }} mode="multiple">
  //           <Option key="NO STONT" value="NO STONT">NO STONT</Option>
  //           <Option key="Imacol" value="Imacol">Imacol</Option>
  //           <Option key="ABS" value="ABS">ABS</Option>
  //           <Option key="HTL" value="HTL">HTL</Option>
  //           <Option key="Power Wash Total AK NEW" value="Power Wash Total AK NEW">Power Wash Total AK NEW</Option>
  //           <Option key="Caustic" value="Caustic">Caustic</Option>
  //           <Option key="Hypo" value="Hypo">Hypo</Option>
  //           <Option key="Meta" value="Meta">Meta</Option>
  //           <Option key="Potassium Per Magnate" value="Potassium Per Magnate">Potassium Per Magnate</Option>
  //           <Option key="Red A" value="Red A">Red A</Option>
  //           <Option key="Brown" value="Brown">Brown</Option>
  //           <Option key="WD" value="WD">WD</Option>
  //           <Option key="Salt" value="Salt">Salt</Option>
  //           <Option key="Softouch OET" value="Softouch OET">Softouch OET</Option>

  //         </Select>
  //       ),
  //     },
  //     {
  //       title: '%',
  //       dataIndex: 'percentage',
  //       key: 'percentage',
  //       render: (text, record) => (
  //         <InputNumber
  //           min={0}
  //           max={100}
  //           defaultValue={text}
  //         />
  //       ),
  //     },
  //     {
  //       title: 'Dosage',
  //       dataIndex: 'dosage',
  //       key: 'dosage',
  //       render: (text) => <InputNumber min={0} style={{ width: 60 }} defaultValue={text} />,
  //     },
  //     {
  //       title: 'Centigrade',
  //       dataIndex: 'centigrade',
  //       key: 'centigrade',
  //       render: (text) => <InputNumber min={0} style={{ width: 60 }} defaultValue={text} />,
  //     },
  //   ];

  //   const showModal = () => {
  //     setIsModalOpen(true);
  //   };

  //   const handleCancel = () => {
  //     setIsModalOpen(false);
  //   };

  //   const handleUpload = async (file) => {
  //     const formData = new FormData();
  //     formData.append('files', file);

  //     try {
  //       const response = await axios.post('http://localhost:8000/uploadfile/', formData, {
  //         headers: {
  //           'Content-Type': 'multipart/form-data',
  //         },
  //       });

  //       const recipe = response.data.recipes[0];
  //       // console.log("response ===> ", response.data.recipes[0].step[0].chemicals[0].percentage);

  //       const recipesData = response.data.recipes[0].step.map((recipe: any, index: number) => ({
  //         key: index,
  //         step: recipe.step_no,
  //         action: recipe.action,
  //         minutes: recipe.minutes,
  //         liters: recipe.litres,
  //         rpm: recipe.rpm,
  //         chemicalName: recipe.chemicals.map((chemical: any) => chemical.recipe_name), // Mapping for recipe_name
  //         percentage: recipe.chemicals.map((chemical: any) => chemical.percentage),    // Mapping for percentage
  //         dosage: recipe.chemicals.map((chemical: any) => chemical.dosage),            // Mapping for dosage
  //         centigrade: recipe.temperature,
  //       }));
        

  //       setTableData(recipesData);

  //       // Set form values with the recipe data
  //       form.setFieldsValue({
  //         loadSize: recipe.load_size,
  //         machineType: recipe.machine_type,
  //         finish: recipe.finish,
  //         recipe: recipe.recipe_no,
  //         fabric: recipe.fabric,
  //         fno: recipe.Fno,
  //       });
  //       message.success('File uploaded successfully');
  //       setIsModalOpen(false);
  //     } catch (error) {
  //       console.error('Error uploading file:', error);
  //       message.error('Error uploading file');
  //     }
  //   };

  //   const addStep = () => {
  //     const newStep: StepData = {
  //       key: tableData.length + 1,
  //       step: 0,
  //       action: '',
  //       minutes: 0,
  //       liters: 0,
  //       rpm: 0,
  //       chemicalName: '',
  //       percentage: 0,
  //       dosage: 0,
  //       centigrade: 0,
  //     };
  //     setTableData([...tableData, newStep]);
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
  //         <Form form={form} layout="vertical">
  //           <Row gutter={16}>
  //             <Col xs={24} md={12}>
  //               <Form.Item label="Load Size" name="loadSize">
  //                 <InputNumber style={{ width: '100%' }} />
  //               </Form.Item>
  //             </Col>
  //             <Col xs={24} md={12}>
  //               <Form.Item label="Machine Type" name="machineType">
  //                 <Select placeholder="Select machine type" style={{ width: '100%' }}>
  //                   <Option value="UP SYSTEM">UP SYSTEM</Option>
  //                   <Option value="type2">Type 2</Option>
  //                 </Select>
  //               </Form.Item>
  //             </Col>
  //           </Row>
  //           <Row gutter={16}>
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
  //             <Button type="primary" style={{ backgroundColor: '#797FE7' }} onClick={addStep}>Add Steps+</Button>
  //           </Col>
  //         </Row>
  //         <div style={{ overflowX: 'auto' }}>
  //           <Table
  //             ref={tableRef} // Attach ref to the table
  //             columns={columns}
  //             dataSource={tableData}
  //             pagination={false}
  //             bordered={false}
  //             style={{ backgroundColor: '#F5F5F5' }}
  //             scroll={{ x: true }}
  //           />
  //         </div>
  //       </div>

  //       <Modal
  //         title="Upload File"
  //         open={isModalOpen}
  //         onCancel={handleCancel}
  //         footer={null}
  //       >
  //         <Upload
  //           customRequest={({ file, onError }) => {
  //             handleUpload(file)
  //               .then(() => {
  //                 console.log("File has been uploaded", file);
  //               })
  //               .catch((error) => {
  //                 onError?.(error);
  //               });
  //           }}
  //           showUploadList={false}
  //         >
  //           <Button icon={<UploadOutlined />}>Choose Files</Button>
  //         </Upload>
  //       </Modal>
  //     </div>
  //   );
  // };

  // export default RecipeForm;



"use client";

import React, { useState, useRef } from "react";
import { Modal, Upload, Form, Input, InputNumber, Select, Row, Col, Button, Table, message } from "antd";
import { ColumnsType } from "antd/es/table";
import { UploadOutlined, SaveOutlined } from '@ant-design/icons';
import axios from "axios";

const { Option } = Select;

const RecipeForm: React.FC = () => {
  const [chemicalOptions, setChemicalOptions] = useState<string[]>([]);
  const [tableData, setTableData] = useState<StepData[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();

  const tableRef = useRef<any>(null); // Reference to the table

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
          onChange={(value) => handlePercentageChange(value, record.key)}
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

  const handleUpload = async (file) => {
    const formData = new FormData();
    formData.append('files', file);

    try {
      const response = await axios.post('http://localhost:8000/uploadfile/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      const recipe = response.data.recipes[0];
      const recipesData = response.data.recipes[0].step.map((recipe: any, index: number) => ({
        key: index,
        step: recipe.step_no,
        action: recipe.action,
        minutes: recipe.minutes,
        liters: recipe.litres,
        rpm: recipe.rpm,
        chemicalName: recipe.chemicals.map((chemical: any) => chemical.recipe_name), // Joining for display
        percentage: recipe.chemicals.map((chemical: any) => chemical.percentage), // Joining for display
        dosage: recipe.chemicals.map((chemical: any) => chemical.dosage), // Joining for display
        centigrade: recipe.temperature,
      }));
      
      setTableData(recipesData);

      // Set form values with the recipe data
      form.setFieldsValue({
        loadSize: recipe.load_size,
        machineType: recipe.machine_type,
        finish: recipe.finish,
        recipe: recipe.recipe_no,
        fabric: recipe.fabric,
        fno: recipe.Fno,
      });

      // Set chemical options
      setChemicalOptions(response.data.chemicalOptions || []);
      
      message.success('File uploaded successfully');
      setIsModalOpen(false);
    } catch (error) {
      console.error('Error uploading file:', error);
      message.error('Error uploading file');
    }
  };

  const addStep = () => {
    const newStep: StepData = {
      key: tableData.length + 1,
      step: 0,
      action: '',
      minutes: 0,
      liters: 0,
      rpm: 0,
      chemicalName: '',
      percentage: 0,
      dosage: 0,
      centigrade: 0,
    };
    setTableData([...tableData, newStep]);
  };

  const handleChemicalNameChange = (value: string[], key: number) => {
    setTableData((prevData) =>
      prevData.map((item) => (item.key === key ? { ...item, chemicalName: value.join(',') } : item))
    );
  };

  const handlePercentageChange = (value: number | undefined, key: number) => {
    setTableData((prevData) =>
      prevData.map((item) => (item.key === key ? { ...item, percentage: value || 0 } : item))
    );
  };

  const saveRecipe = async () => {
    try {
      const values = form.getFieldsValue();
      const recipeData = {
        ...values,
        steps: tableData,
      };

      await axios.post('http://localhost:3000/api/saveRecipe/', recipeData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      message.success('Recipe saved successfully');
    } catch (error) {
      console.error('Error saving recipe:', error);
      message.error('Error saving recipe');
    }
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
        <Button type="primary" icon={<SaveOutlined />} onClick={saveRecipe}>Save Recipe</Button>
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
        <Upload
          beforeUpload={handleUpload}
          accept=".xlsx"
          multiple={false}
        >
          <Button icon={<UploadOutlined />}>Upload</Button>
        </Upload>
      </Modal>
    </div>
  );
};

export default RecipeForm;


