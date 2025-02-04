import React, { useEffect, useState } from "react";
import { Formik, Form as FormikForm } from "formik";
import { Form, Input, Row, Col, Button, notification } from "antd";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { toggleNewDialog } from "../store/stateSlice";
import { postDemo, putDemo, getDemo } from "../store/dataSlice";
import { useNavigate } from "react-router-dom";
import { useFormikContext, Field } from 'formik';


const { TextArea } = Input;

const Demo = () => {

  const [isFormDirty, setIsFormDirty] = useState(false);
  const navigate = useNavigate();

  // Handle React navigation (button clicks)
  const handleNavigation = (path) => {
    if (!isFormDirty || window.confirm("You have unsaved changes. Leave anyway?")) {
      navigate(path);
    }
  };

  // Handle manual navigation (URL change, refresh, closing tab)
  useEffect(() => {
    const handleBeforeUnload = (event) => {
      if (isFormDirty) {
        event.preventDefault();
        event.returnValue = "You have unsaved changes. Leave anyway?"; // Required for Chrome
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [isFormDirty]);

  const [loading, setLoading] = useState(false);
  const [api, contextHolder] = notification.useNotification();
  const [edit, setEdit] = useState(false);
  const dispatch = useDispatch();
  const selectedDemo = useSelector((state) => state.Demo.state.selectedDemo);

  const validationSchema = Yup.object({
    Demo: Yup.string()
      .min(3, "Demo Name must be at least 3 characters")
      .max(50, "Demo Name cannot exceed 50 characters")
      .required("Demo Name is required"),
    Age: Yup.number()
      .typeError("Age must be a number")
      .min(1, "Age must be at least 1")
      .max(120, "Age cannot be greater than 120")
      .required("Age is required"),
    DESCRIPTION: Yup.string()
      .min(10, "Description must be at least 10 characters")
      .max(512, "Description cannot exceed 512 characters")
      .required("Description is required"),
  });
  

  useEffect(() => {
    setEdit(!!selectedDemo);
  }, [selectedDemo]);

  const initialValues = selectedDemo || {
    Demo: "",
    Age: "",
    DESCRIPTION: "",
    STATUS: true,
  };

  const handleCancel = () => {
    dispatch(toggleNewDialog(false));
  };

  const handleSubmit = async (values, { setSubmitting }) => {
    setLoading(true);
    try {
      const action = edit ? await dispatch(putDemo(values)) : await dispatch(postDemo(values));
      if (action.payload?.code < 300) {
        dispatch(getDemo());
        dispatch(toggleNewDialog(false));
        api.success({
          message: "Form Submitted Successfully.",
          duration: 2,
        });
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

  
  const AutoSubmitToken = () => {

    const { values, submitForm, setFieldValue } = useFormikContext();

    useEffect(() => {
         setIsFormDirty(true)
    }, [values]);



    return null;
};


  return (
    <div className="mt-4">
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
                  help={touched.Demo && errors.Demo ? errors.Demo : ""}
                  validateStatus={touched.Demo && errors.Demo ? "error" : ""}
                >
                  <label className="text-sm">Name</label>
                  <Input
                    name="Demo"
                    placeholder="Enter demo name"
                    value={values.Demo}
                    onChange={handleChange}
                    className="!rounded"
                  />
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={16}>
              <Col span={24}>
                <Form.Item
                  help={touched.Age && errors.Age ? errors.Age : ""}
                  validateStatus={touched.Age && errors.Age ? "error" : ""}
                >
                  <label className="text-sm">Age</label>
                  <Input
                    name="Age"
                    placeholder="Enter age"
                    value={values.Age}
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
                  <label className="text-sm">Description</label>
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
                  Cancel
                </Button>
                <Button
                  type="primary"
                  htmlType="submit"
                  className="!rounded"
                  disabled={isSubmitting}
                  loading={loading}
                >
                  {edit ? "Update" : "Submit"}
                </Button>
              </Col>
            </Row>
          </FormikForm>
        )}
      </Formik>
    </div>
  );
};

export default Demo;