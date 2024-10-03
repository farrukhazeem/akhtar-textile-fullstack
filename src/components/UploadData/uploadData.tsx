// UploadData.tsx
import React from 'react';
import { Upload, Button, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import axios from 'axios';

interface UploadDataProps {
  setTableData: (data: any) => void;
  setChemicalOptions: (options: string[]) => void;
  setIsModalOpen: (open: boolean) => void;
  form: any;
  setRecipe1: (recipe: any) => void;
}

const UploadData: React.FC<UploadDataProps> = ({ setTableData, setChemicalOptions, setIsModalOpen, form, setRecipe1 }) => {
  const handleUpload = async (file: File) => {
    const formData = new FormData();
    formData.append('files', file);

    try {
      const response = await axios.post('https://huge-godiva-arsalan-3b36a0a1.koyeb.app/uploadfile/', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      console.log('Upload Response:', response.data);
      const recipe = response.data.recipes[0];
      console.log(recipe.recipe_no);
      setRecipe1(recipe);
      // const checkRecipeData = () => {
      //   if (recipe.step.chemicals.length > 1) {
      //     return {
      //       recipe.step.map((step: any, index: number) => ({
              
      //       })

      //     }
      //   }
      // }
      const recipesDataForTable = () => {
        let data: any[] = [];
        recipe.step.forEach((x:any,index:number)=>{
          let data1={}

            data1 = x.chemicals.map((y:any)=>({
              key: index,
              step: x.step_no,
              action: x.action,
              minutes: x.minutes,
              liters: x.litres,
              rpm: x.rpm,
              chemicalName:y.recipe_name,
              percentage: y.percentage,
              dosage: y.dosage,
              centigrade: x.temperature,
            }))
            console.log(data1)
            data1.forEach((x:any)=>{
              data.push(x)
            })
        })
        console.log(data)
        return data
          // recipe.step.forEach((chemical: { recipe_name: any, percentage: any, dosage: any }) => {
            
        //     recipe.step.map(() => ({
        //   key: index,
        // step: step.step_no,
        // action: step.action,
        // minutes: step.minutes,
        // liters: step.litres,
        // rpm: step.rpm,
        // // chemicalName:chemical.recipe_name,
        // // percentage: chemical.percentage,
        // // dosage: chemical.dosage,
        // centigrade: step.temperature,
        // }))
        console.log(recipe)
      }

      // const recipesDataForTable = recipe.step.map((step: any, index: number) => ({
      //   key: index,
      //   step: step.step_no,
      //   action: step.action,
      //   minutes: step.minutes,
      //   liters: step.litres,
      //   rpm: step.rpm,
      //   chemicalName: step.chemicals.map((chemical: any) => chemical.recipe_name),
      //   percentage: step.chemicals.map((chemical: any) => chemical.percentage),
      //   dosage: step.chemicals.map((chemical: any) => chemical.dosage),
      //   centigrade: step.temperature,
      // }));

  
      console.log(recipesDataForTable);
      setTableData(recipesDataForTable);
      form.setFieldsValue({
        fileName: recipe.file_name,
        loadSize: recipe.load_size,
        machineType: recipe.machine_type,
        finish: recipe.finish,
        recipe: recipe.recipe_no,
        fabric: recipe.fabric,
        fno: recipe.Fno,
      });
      setChemicalOptions(recipe.step || []);
      message.success('File uploaded successfully');
      setIsModalOpen(false);
    } catch (error) {
      console.error('Error uploading file:', error);
      message.error('Error uploading file');
    }
  };

  return (
    <Upload
      beforeUpload={handleUpload}
      accept=".xlsx, .xls"
      multiple={false}
    >
      <Button icon={<UploadOutlined />}>Upload</Button>
    </Upload>
  );
};

export default UploadData;
