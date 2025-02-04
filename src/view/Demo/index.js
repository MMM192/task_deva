import React, { useEffect } from "react";
import { Button, Modal, Card } from "antd";
import { FaUser } from "react-icons/fa";
import { LuPlus } from "react-icons/lu";
import DemoForm from "./Components/Demo";
import { injectReducer } from "../../store";
import Demo from "./store";
import { useSelector, useDispatch } from "react-redux";
import { toggleNewDialog, setSelectedDemo } from "./store/stateSlice";

import { useNavigate } from "react-router-dom";
injectReducer("Demo", Demo);

const Demo1 = () => {
  const navigate = useNavigate();
 
 


  const dialog = useSelector((state) => state.Demo.state.newDialog);
  const AddEdit = useSelector((state) => state.Demo.state.selectedDemo);
  const dispatch = useDispatch();

  const onDialog = () => {
    dispatch(setSelectedDemo(null));
    dispatch(toggleNewDialog(true));
  };

  const handleCloseModal = () => {
    dispatch(toggleNewDialog(false)); // Close the modal
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="bg-white w-full max-w-6xl p-12 rounded-2xl shadow-xl">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Demo Dashboard</h1>
          <Button
            type="primary"
            icon={<LuPlus className="mr-2" />}
            style={{ backgroundColor: "#096CAE" }}
            className="flex items-center gap-2 py-2 px-4 rounded-lg"
            onClick={onDialog}
          >
            Add Demo
          </Button>
        </div>

        {/* Dummy content for design */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[1, 2, 3, 4].map((item) => (
            <Card key={item} className="p-6 shadow-md hover:shadow-lg">
              <h2 className="text-xl font-semibold text-gray-700 mb-4">Demo Item {item}</h2>
              <p className="text-gray-600">This is a sample description for demo item {item}. You can customize this content as needed.</p>
            </Card>
          ))}
        </div>

        <Modal
          title={
            <div className="flex items-center gap-2 text-[#096CAE]">
              <FaUser />
              {AddEdit ? "Edit Demo" : "Add New Demo"}
            </div>
          }
          open={dialog}
          footer={null}
          style={{ top: "10%" }}
          onCancel={handleCloseModal}
        >
          <DemoForm />
        </Modal>
      </div>
    </div>
  );
};

export default Demo1;
