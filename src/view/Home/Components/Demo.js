import React, { useEffect, useState } from "react";
import { Formik, Form as FormikForm } from "formik";
import { Form, Input, Row, Col, Button, notification, Modal } from "antd";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { toggleNewDialog ,cntRe} from "../store/stateSlice";
import { addData, fetchReports } from "../store/dataSlice";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useFormikContext, Field } from 'formik';
import { useCallback } from "react";

import  BackButtonHandler from "./BackButtonHandler";
const { TextArea } = Input;

const Demo = () => {
  const [isFormDirty, setIsFormDirty] = useState(false);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [api, contextHolder] = notification.useNotification();
  const [edit, setEdit] = useState(false);
  const [modalCount, setModalCount] = useState(0);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalKey, setModalKey] = useState(0);

  const dispatch = useDispatch();
  const selectedDemo = useSelector((state) => state.Demo.state.selectedDemo);
  const cnt = useSelector((state) => state.Demo.state.cnt);

  

 

  // useEffect(() => {
  //   const handlePopState = (event) => {
  //     console.log("popstate alertCount", cnt);
  //     if (cnt < 3) {
  //       alert(`Are you sure you want to go back? (${cnt + 1}/3)`);
 
  //      dispatch(cntRe(cnt + 1));
  //       window.history.pushState(null, "", window.location.pathname);
  //     } else {
  //       dispatch(cntRe(0));
  //       navigate("/");
  //     }
  //   };

  //   window.history.pushState(null, "", window.location.pathname);
  //   window.addEventListener("popstate", handlePopState);
  //   return () => {
  //     window.removeEventListener("popstate", handlePopState);
  //   };
  // }, [cnt, navigate]);
  // useEffect(() => {
  //   const handlePopState = (event) => {
  //     console.log("popstate alertCount", cnt);
  //     if (cnt < 3) {
  //       alert(`Are you sure you want to go back? (${cnt + 1}/3)`);
        
  //       setTimeout(() => {
  //         alert("This is another alert inside the first alert's OK button.");
  //       }, 0);
  
  //       dispatch(cntRe(cnt + 1));
  //       window.history.pushState(null, "", window.location.pathname);
  //     } else {
  //       dispatch(cntRe(0));
  //       navigate("/");
  //     }
  //   };
  
  //   window.history.pushState(null, "", window.location.pathname);
  //   window.addEventListener("popstate", handlePopState);
  //   return () => {
  //     window.removeEventListener("popstate", handlePopState);
  //   };
  // }, [cnt, navigate]);
  
  useEffect(() => {
    const handlePopState = async (event) => {
      console.log("popstate alertCount", cnt);
      
     
       await alert(`Are you sure you want to go back? `);
       await alert(`Are you sure you want to go back? `);

      event.preventDefault();
            window.history.back();
    };
  
    window.history.pushState(null, "", window.location.pathname);
    window.addEventListener("popstate", handlePopState);
    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, [cnt, navigate]);
  


  useEffect(() => {
    const handleBeforeUnload = async (event) => {
      if (isFormDirty) {
        
        event.preventDefault();
        event.returnValue = "You have unsaved changes. Leave anyway?"; 
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [isFormDirty]);



  
  useEffect(() => {
    setEdit(!!selectedDemo);
  }, [selectedDemo]);

  const validationSchema = Yup.object({
    NAME: Yup.string()
      .min(3, "  Name must be at least 3 characters")
      .max(50, "  Name cannot exceed 50 characters")
      .required("  Name is required"),
    AGE: Yup.number()
      .typeError("AGE must be a number")
      .min(1, "AGE must be at least 1")
      .max(120, "AGE cannot be greater than 120")
      .required("AGE is required"),
    DESCRIPTION: Yup.string()
      .required("Description is required"),
  });

  const initialValues = selectedDemo || {
    NAME: "",
    AGE: "",
    DESCRIPTION: "",
  };

  const handleCancel = () => {
    setIsModalVisible(true);
  };

  const handleModalOk = () => {
    if (modalCount < 2) {
      setModalCount(modalCount + 1);
      setModalKey((prevKey) => prevKey + 1);
    } else {
      dispatch(toggleNewDialog(false));
      navigate("/view");
    }
  };

  const handleModalClick = () => {
    setModalKey((prevKey) => prevKey + 1);
  };

  const handleSubmit = async (values, { setSubmitting }) => {
    setLoading(true);
    try {
      const action = await dispatch(addData(values));
      
      if (action?.meta?.requestStatus === "fulfilled") {
        await dispatch(fetchReports());
        await dispatch(toggleNewDialog(false));
        await api.success({
          message: "Form Submitted Successfully.",
          duration: 2,
        });
  
        // Adding a delay of 2 seconds before navigation
        await new Promise((resolve) => setTimeout(resolve, 2000));
  
        await navigate("/view");
      } else {
        api.error({
          message: "Error occurred during form submission.",
          description: action.payload?.error || "Unknown error",
        });
      }
    } catch (error) {
      api.error({
        message: "An unexpected error occurred.",
        description: error.message,
      });
    } finally {
      setSubmitting(false);
      setLoading(false);
    }
  };
  
  // const handleSubmit = async (values, { setSubmitting }) => {
  //   setLoading(true);
  //   try {
  //     const action = await dispatch(addData(values));

  //     console.log("sccdcdcd",action);
  //     if (action?.meta?.requestStatus === "fulfilled") {
  //       await  dispatch(fetchReports());
  //       api.success({ message: "Form Submitted Successfully.", duration: 2 });
  //     } else {
  //       api.error({
  //         message: "Error occurred during form submission.",
  //         description: action.payload?.error || "Unknown error",
  //       });
  //     }
  //   } catch (error) {
  //     api.error({
  //       message: "An unexpected error occurred.",
  //       description: error.message,
  //     });
  //   } finally {
  //     setSubmitting(false);
  //     setLoading(false);
  //   }
  // };


    const AutoSubmitToken = () => {
  
      const { values, submitForm, setFieldValue } = useFormikContext();
  
      useEffect(() => {
           setIsFormDirty(true)
      }, [values]);
  
  
  
      return null;
  };
  
  

  return (
    <div className="p-[10px]">
      {/* <BackButtonHandler/> */}
      {contextHolder}
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
        enableReinitialize
      >
        {({ values, touched, errors, handleChange, setFieldValue, isSubmitting }) => (
          <FormikForm>
                            <AutoSubmitToken />

            <Row gutter={16}>
              <Col span={24}>
                <Form.Item
                  help={touched.NAME && errors.NAME ? errors.NAME : ""}
                  validateStatus={touched.NAME && errors.NAME ? "error" : ""}
                >
                  <Input
                    name="NAME"
                    placeholder="Enter NAME"
                    value={values.NAME}
                    onChange={handleChange}
                    className="!rounded"
                  />
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={16}>
              <Col span={24}>
                <Form.Item
                  help={touched.AGE && errors.AGE ? errors.AGE : ""}
                  validateStatus={touched.AGE && errors.AGE ? "error" : ""}
                >
                  <Input
                    name="AGE"
                    placeholder="Enter AGE"
                    value={values.AGE}
                    onChange={handleChange}
                    className="!rounded"
                  />
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={16}>
              <Col span={24}>
                <Form.Item
                  help={touched.DESCRIPTION && errors.DESCRIPTION ? errors.DESCRIPTION : ""}
                  validateStatus={touched.DESCRIPTION && errors.DESCRIPTION ? "error" : ""}
                >
                  <TextArea
                    rows={4}
                    placeholder="Add a description (max 512 characters)"
                    maxLength={512}
                    value={values.DESCRIPTION}
                    onChange={(e) => setFieldValue("DESCRIPTION", e.target.value)}
                  />
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={16}>
              <Col span={24} className="flex justify-end">
                <Button
                  onClick={handleCancel}
                  className="mr-4 border-blue-500 text-blue-500"
                >
                  Back
                </Button>
                <Button
                  type="primary"
                  htmlType="submit"
                  className="!rounded"
                  disabled={isSubmitting}
                  loading={loading}
                >
                  Submit
                </Button>
              </Col>
            </Row>
          </FormikForm>
        )}
      </Formik>

      {isModalVisible && (
        <motion.div
          key={modalKey}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.3 }}
          onClick={handleModalClick}
        >
          <Modal
            title="Warning"
            visible={true}
            onOk={handleModalOk}
            onCancel={() => setIsModalVisible(false)}
            okText="OK"
            cancelText="Cancel"
          >
            <p>You have unsaved changes. Are you sure you want to leave?</p>
          </Modal>
        </motion.div>
      )}
    </div>
  );
};

export default Demo;
