import Employees from "@/components/Employees/Employees";
import { UseCurrentUrlServerSide } from "@/utils/useCurrentUrlServerSide";

const employees: React.FC = async () => {
  const url = UseCurrentUrlServerSide();
  
  const fetchUsers = async () => {
    try {
      
       const response = await fetch(`${url}/api/getAllUsers`,{
        cache: 'no-store',
       });
       if (!response.ok) {
         throw new Error('Network response was not ok');
       }
       const data = await response.json();  
       return data.users;
       
       } catch (error) {
       
       console.error('Failed to fetch users:', error);
       return [];
     }
   };
  const userData = await fetchUsers();
  return (
    <div>
     <Employees userData={userData}/>
    </div>
  );
};

export default employees;