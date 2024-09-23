'use client'

import React, { useState, useEffect } from 'react';
import { Modal, Button, Input } from 'antd';
import ChemicalForm from '@/components/ChemicalForm/ChemicalForm';

const Chemicals = () => {
  const [chemicals, setChemicals] = useState<any[]>([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [query, setQuery] = useState("");
  const [originalChemicalList, setOriginalChemicalList] = useState([]);
  const keys = ["name"]
  const search = (data:any) => {
    return data.filter((item:any)=>{
     return keys.some(key=>item[key].toLowerCase().includes(query.toLowerCase()));
    })
  }

  useEffect(()=>{
    const filteredData = search(originalChemicalList);
    setChemicals(filteredData)

  },[query, originalChemicalList])
  
  const fetchChemicals = async () => {
   try {
      const response = await fetch('/api/getAllChemicals');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setChemicals(data.chemicals);
      setOriginalChemicalList(data.chemicals)
      
      } catch (error) {
      console.error('Failed to fetch chemicals:', error);
    }
  };
  
  useEffect(() => {
    fetchChemicals();
  }, []);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

    // Function to handle the form submission success
    const handleFormSuccess = () => {
      fetchChemicals(); // Refresh the user list
        setIsModalVisible(false); // Close the modal
      };

  return (
    <div>
      <div className="flex items-center justify-between">
        <h5 className="mt-0 mb-2 text-gray-800 font-medium text-lg">Chemicals</h5>
        <div className="flex items-center space-x-4">
          <Input
            placeholder="Search Chemicals"
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
  <thead className="bg-purple-50 border border-gray-200 text-gray-600">
  <tr>
    <th className="w-1/9 px-4 text-left text-xs text-black">
      Washing Name
    </th>
    <th className="w-1/9 text-left text-xs text-black">
      Full Name
    </th>
    <th className="w-1/9 text-left text-xs text-black">
      Cost/KG
    </th>
    <th className="w-1/9 py-3 text-left text-xs text-black">
      KG/Can
    </th>
    <th className="w-1/9 py-3 text-left text-xs text-black">
      Cost/Unit Of Usage
    </th>
    <th className="w-1/9 py-3 text-left text-xs text-black ">
      Cost/UOM
    </th>
    <th className="w-1/9 py-3 text-left text-xs text-black">
      Type & Use
    </th>
    <th className="w-1/9 py-3 text-left text-xs text-black">
      Unit Used
    </th>
    <th className="w-1/9 py-3 text-left text-xs text-black">
      Unit Conversion
    </th>
  </tr>
</thead>


    <tbody className="bg-white divide-y divide-gray-200">
      {chemicals.map((chemicals: any) => (
        <tr key={chemicals.id} className="hover:bg-purple-50 transition duration-200">
          <td className="px-6 py-4">
            <span className='text-[#797FE7] '>{chemicals.name}</span>
          </td>
          <td className="px-3 py-4 ">
            <span className='text-[#797FE7] '>{chemicals.full_name}</span>
          </td>
          <td className="px-3 py-4  text-center">
            <span className='text-[#797FE7] '>{chemicals.cost_per_kg}</span>
          </td>
          <td className="px-3 py-4  text-center">
            <span className='text-[#797FE7] '>{chemicals.kg_per_can}</span>
          </td>
          <td className="px-3 py-4  text-center">
            <span className='text-[#797FE7] '>{chemicals.cost_per_unit}</span>
          </td>
          <td className="px-3 py-4  text-center">
            <span className='text-[#797FE7] '>{chemicals.cost_uom}</span>
          </td>
          <td className="px-3 py-4 ">
            <span className='text-[#797FE7] '>{chemicals.type_and_use}</span>
          </td>
          <td className="px-3 py-4  text-center">
            <span className='text-[#797FE7] '>{chemicals.unit_used}</span>
          </td>
          <td className="px-3 py-4  text-center">
            <span className='text-[#797FE7] '>{chemicals.unit_conversion}</span>
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
        <h1 className="text-xl font-bold mb-4">Chemical Form</h1>
        <hr className="mb-2" />

        <ChemicalForm onSuccess={handleFormSuccess} setIsModalVisible={setIsModalVisible} />
      </Modal>
    </div>
  );
};

export default Chemicals;
