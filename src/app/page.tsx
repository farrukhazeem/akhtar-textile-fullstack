'use client';
import React,{useEffect,useState} from 'react';
import "./globals.css";
import { useForm } from "react-hook-form";
import { useRouter } from 'next/navigation'; 
import { message } from 'antd';
import { LockOutlined, UnlockOutlined,UserOutlined } from '@ant-design/icons';

interface LoginProps {
  username: string;
  password: string;
}

const defaultValues: LoginProps = {
  username: "",
  password: "",
};

const Login: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginProps>({
    defaultValues,
  });
  const [showPassword, setShowPassword] = useState(false);

  const [loginError, setLoginError] = useState<string | null>(null); 
  const router = useRouter(); 
 
  const onSubmit = async(values: LoginProps) => {
    try {
      const res = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: values.username, 
          password: values.password,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setLoginError(data.message || 'Failed to login');
        message.error(data.message || 'Login failed. Please try again.'); 
        return;
      }

      router.push('/dashboard');
    } catch (error) {
      console.error('Login failed', error);
      setLoginError('Something went wrong. Please try again.');
    }

  };


  return (
    <>

    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
      
      {/* Main Content Section */}
      <div className="absolute w-[70%] bg-[#EBEFFF] h-screen">
        <div className="relative container mx-auto">
          <div className="relative pt-[30%] pl-[25%]">
            <div className="relative color-[#1A1A1A] ml-[17.5%] font-inter text-[2vh] font-[700] text-left">
              Welcome Back!
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="form">
              <div className="relative mt-[5%] text-[2vh] font-[400]">
                <div>
                  <label htmlFor="username">
                    Username:
                  </label>
                  <div>
                    <input
                      {...register("username")}
                      type="text"
                      id="username"
                      className="px-[10px] w-[55%] border border-[#656ED3] rounded-lg text-sm"
                    />
                              <UserOutlined className="ml-2 text-[#656ED3] text-xl"/>
                  </div>
                </div>
                  <div className="relative text-[2vh] font-[400]">
                    <label htmlFor="password">
                      Password:
                    </label>
                    <div className="flex items-center">
                      <input
                        {...register("password")}
                        type={showPassword ? "text" : "password"}
                        id="password"
                        className="px-[10px] w-[55%] border border-[#656ED3] rounded-lg text-sm"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="ml-2 text-[#656ED3] text-xl"
                      >
                        {showPassword ? <UnlockOutlined /> : <LockOutlined />}
                      </button>
                    </div>
                  </div>
              </div>
              <button
                type="submit"
                className="w-[55%] bg-[#656ED3] rounded-lg text-white mt-[2.5%] text-sm"
              >
                Login
              </button>
            </form>
          </div>
        </div>
      </div>

      <div className="absolute top-0 right-0 w-[30%] bg-[#656ED3] h-screen">
        <img src='img/login-pc.png' className='relative top-[25%] left-[-40%]' style={{width: '100%', height: 'auto'}} ></img>
      </div>

    </div>
    </>
    
  );
};

export default Login;
