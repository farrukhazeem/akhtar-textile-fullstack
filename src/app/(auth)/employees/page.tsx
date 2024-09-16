'use client'

import React, { use, useState } from 'react';
import { Modal, Button, Input } from 'antd';
import { Col, Row } from "antd";
import EmployeeForm from '@/components/EmployeeForm/EmployeeForm';



const Employees = () => {
    const [isModalVisible, setIsModalVisible] = useState(false);
  
    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleOk = () => {
        setIsModalVisible(false);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

 

    return (
        <div>
            <div className="flex items-center justify-between">
                <h5 className="mt-0 mb-2 text-gray-800 font-medium text-lg">Employees</h5>
                <div className="flex items-center space-x-4">
                    <Input
                        placeholder="Enter Name"
                        className="border border-gray-300 rounded-sm px-3 py-2 text-gray-800 text-sm transition-all duration-300 hover:border-blue-500 hover:border-r rounded-2xl"
                    />
                    <Button
                        type="primary"
                        onClick={showModal}
                        style={{ backgroundColor: '#656ed3', color: '#ffffff' }}
                        className="px-4 py-2 rounded-sm hover:bg-blue-600 rounded-2xl"
                    >
                        Create
                    </Button>
                </div>
            </div>

            {/* Table */}
            <div className="mt-8 overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200 rounded-lg">
                    <thead className="bg-gray-50 border border-gray-200 text-gray-500">
                        <tr>
                            <th className="w-1/12 px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Code
                            </th>
                            <th className="w-1/4 px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Basic Info
                            </th>
                            <th className="w-1/4 px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Employee Info
                            </th>
                            <th className="w-1/4 px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Bank Info
                            </th>
                            <th className="w-1/6 px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                History
                            </th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        <tr>
                            <td className="px-6 py-4 whitespace-nowrap">001</td>
                            <td className="px-6 py-4 whitespace-nowrap">Farrukh Azeem</td>
                            <td className="px-6 py-4 whitespace-nowrap">XYZ Corp</td>
                            <td className="px-6 py-4 whitespace-nowrap">Habib Bank</td>
                            <td className="px-6 py-4 whitespace-nowrap">Active</td>
                        </tr>
                        <tr>
                            <td className="px-6 py-4 whitespace-nowrap">002</td>
                            <td className="px-6 py-4 whitespace-nowrap">Saad Khan</td>
                            <td className="px-6 py-4 whitespace-nowrap">Hail Technologies</td>
                            <td className="px-6 py-4 whitespace-nowrap">United Bank</td>
                            <td className="px-6 py-4 whitespace-nowrap">Active</td>
                        </tr>
                        <tr>
                            <td className="px-6 py-4 whitespace-nowrap">003</td>
                            <td className="px-6 py-4 whitespace-nowrap">Bilal Khan</td>
                            <td className="px-6 py-4 whitespace-nowrap">Hail Technologies</td>
                            <td className="px-6 py-4 whitespace-nowrap">United Bank</td>
                            <td className="px-6 py-4 whitespace-nowrap">Active</td>
                        </tr>
                        <tr>
                            <td className="px-6 py-4 whitespace-nowrap">003</td>
                            <td className="px-6 py-4 whitespace-nowrap">Farrukh Azeem</td>
                            <td className="px-6 py-4 whitespace-nowrap">Hail Technologies</td>
                            <td className="px-6 py-4 whitespace-nowrap">National Bank</td>
                            <td className="px-6 py-4 whitespace-nowrap">Active</td>
                        </tr>
                        {/* Add more rows as needed */}
                    </tbody>
                </table>
            </div>

            {/* Modal */}
            <Modal
                visible={isModalVisible}
                onCancel={handleCancel}
                cancelText="Cancel"
                footer={null}
                width={1000}

            >
                {/* Add your form fields here */}
                <h1 className="text-xl font-bold mb-4">Employee Form</h1>
                <hr className='mb-2'/>
             
                <EmployeeForm />


            </Modal>
        </div>
    );
};

export default Employees;
