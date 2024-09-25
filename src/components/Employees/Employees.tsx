'use client'

import React, { useState, useEffect } from 'react';
import { Modal, Button, Input , Spin } from 'antd';
import EmployeeForm from '@/components/EmployeeForm/EmployeeForm';
import { LoadingOutlined } from '@ant-design/icons';
import { FormInstance } from 'antd/lib/form'; // Import FormInstance

const Employees = () => {
  const [users, setUsers] = useState<any[]>([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [query, setQuery] = useState("");
  const [originalEmployeeList, setOriginalEmployeeList] = useState([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [formRef, setFormRef] = useState<FormInstance | null>(null);  const pageLoadingSpinner = <LoadingOutlined style={{ fontSize: 48, color: '#800080' }} spin />;

  const keys = ["name"]
  const search = (data:any) => {
    return data.filter((item:any)=>{
     return keys.some(key=>item[key].toLowerCase().includes(query.toLowerCase()));
    })
  }

  useEffect(()=>{
    const filteredData = search(originalEmployeeList);
    setUsers(filteredData)

  },[query, originalEmployeeList])
  
  const fetchUsers = async () => {
   try {
    setLoading(true);
      const response = await fetch('/api/getAllUsers');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setUsers(data.users);
      setOriginalEmployeeList(data.users)
      setLoading(false);
      
      } catch (error) {
      console.error('Failed to fetch users:', error);
    }
  };
  
  useEffect(() => {
    fetchUsers();
  }, []);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {

    if (formRef) {
      formRef.resetFields();
    }
    setIsModalVisible(false);

  };

    // Function to handle the form submission success
    const handleFormSuccess = () => {
        fetchUsers(); // Refresh the user list
        setIsModalVisible(false); // Close the modal
      };
      if (loading) return <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh' }}><Spin indicator={pageLoadingSpinner} /></div>;

  return (
    <div>
      <div className="flex items-center justify-between">
        <h5 className="mt-0 mb-2 text-gray-800 font-medium text-lg">Employees</h5>
        <div className="flex items-center space-x-4">
          <Input
            placeholder="Search Name"
            onChange={e => setQuery(e.target.value)}
            className="border border-gray-300 rounded-sm px-3 py-2 text-gray-800 text-sm transition-all duration-300 hover:border-blue-500 hover:border-r rounded-2xl"
          />
          <Button
            type="primary"
            onClick={showModal}
            style={{ backgroundColor: '#797FE7', borderRadius: '100px' }}
            className="px-4 py-2"
          >
            Create
          </Button>
        </div>
      </div>

      {/* Table */}
      <div className="mt-8">
  <table className="min-w-full divide-y divide-gray-200 rounded-lg shadow-lg">
    <thead className="bg-[#FAFAFA] border border-gray-200 text-gray-600">
      <tr>
        <th className="w-1/12 px-6 py-3 text-left text-xs font-bold text-black uppercase tracking-wider">
          Code
        </th>
        <th className="w-1/4 px-6 py-3 text-left text-xs font-bold text-black uppercase tracking-wider">
          Basic Info
        </th>
        <th className="w-1/4 px-6 py-3 text-left text-xs font-bold text-black uppercase tracking-wider">
          Employee Info
        </th>
        <th className="w-1/4 px-6 py-3 text-left text-xs font-bold text-black uppercase tracking-wider">
          Bank Info
        </th>
        <th className="w-1/6 px-6 py-3 text-left text-xs font-bold text-black uppercase tracking-wider">
          History
        </th>
      </tr>
    </thead>

    <tbody className="bg-white divide-y divide-gray-200">
      {users.map((user: any) => (
        <tr key={user.id} className="hover:bg-purple-50 transition duration-200">
          <td className="px-6 py-4 whitespace-nowrap text-[#797FE7] font-medium">{user.code}</td>
          <td className="px-6 py-4 whitespace-nowrap">
            <span className="font-semibold">Name:</span> <span className='text-[#797FE7] font-medium'>{user.name}</span>
            <br />
            {`CNIC: ${user.cnic ? user.cnic : '-'}`}<br />
            {`Department: ${user.department ? user.department : '-'}`}
          </td>
          <td className="px-6 py-4 whitespace-nowrap">
            {`Designation: ${user.designation ? user.designation : '-'}`}<br />
            {`Phone: ${user.phone ? user.phone : '-'}`}<br />
            {`Manager: ${user.manager ? user.manager : '-'}`}
          </td>
          <td className="px-6 py-4 whitespace-nowrap">
            {`Bank Name: ${user.bank ? user.bank : '-'}`}<br />
            {`Account#: ${user.account ? user.account : '-'}`}<br />
          </td>
          <td className="px-6 py-4 whitespace-nowrap">
            <span className="font-semibold">Creator:</span> <span className=' text-[#797FE7] font-medium'>{user.createdBy}</span>
            <br />
            <span className="font-semibold">Modifier:</span> <span className='text-gray-500 font-medium'>{user.updatedBy == null ? '( )' : user.updatedBy}</span>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
</div>

      {/* Modal */}
      <Modal
        open={isModalVisible}
        onCancel={handleCancel}
        cancelText="Cancel"
        footer={null}
        width={1000}
      >
        <h1 className="text-xl font-bold mb-4">Employee Form</h1>
        <hr className="mb-2" />

        <EmployeeForm onSuccess={handleFormSuccess}
         setIsModalVisible={setIsModalVisible}
         setFormRef={setFormRef} 
         />
      </Modal>
    </div>
  );
};

export default Employees;
