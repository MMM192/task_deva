import React, { useEffect } from "react";
import { Button, Modal, Card } from "antd";
import { FaUser } from "react-icons/fa";
import { LuPlus } from "react-icons/lu";
import DemoForm from "./Components/Demo";
import { injectReducer } from "../../store";
import Home from "./store";
import { useSelector, useDispatch } from "react-redux";
import { toggleNewDialog, setSelectedDemo } from "./store/stateSlice";

import { useNavigate } from "react-router-dom";
injectReducer("Home", Home);

const Demo1 = () => {
   
 
  const dispatch = useDispatch();

  

  return (
    <div className="h-auto bg-gradient-to-r flex items-center justify-center px-4 sm:px-6 lg:px-8 py-16">
    <div className="bg-white w-full max-w-lg p-8 rounded-2xl shadow-lg transition duration-300 hover:shadow-2xl">
      <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">Welcome to  Form</h2>
  
      <DemoForm />
    </div>
  </div>
  
 

  );
};

export default Demo1;
