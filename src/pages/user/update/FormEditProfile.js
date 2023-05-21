import { Box, Button, Grid, TextField } from "@mui/material";
import { Form, Formik } from "formik";
import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import * as Yup from "yup";

const FormEditProfile = () => {
  const defaultInitialValues = {
    userName: "",
    email: "",
    password: "",
    rePassword: "",
  };

  const navigate = useNavigate();
  const params = useParams();
  const paramId = params.id;

  const [initialValues, setInitialValues] = useState(defaultInitialValues);

  const validationSchema = Yup.object({
    userName: Yup.string().nullable().required("User name is required"),
    email: Yup.string().nullable().required("email is Required"),
    // password: Yup.string().nullable().required("email is Required"),
  });

  const buildBodyUpload = (values) => {
    const newValues = {
      ...values,
    };
    return newValues;
  };

  const handleOnSubmit = async (values, formik) => {
    const newValues = buildBodyUpload(values);
  };

  return (
    <>
      <Formik
        initialValues={initialValues}
        onSubmit={handleOnSubmit}
        validationSchema={validationSchema}
        validateOnBlur={false}
        validateOnChange={true}
        enableReinitialize={true}
      >
        {(formik) => (
          <>
            <Form noValidate autoComplete="off">
              <Box>
                <Grid container spacing={2}>
                  <Grid item xs={12} md={12} lg={12}>
                    <TextField
                      fullWidth
                      id="userName"
                      name="userName"
                      label="User name"
                      value={formik.values.userName}
                      onChange={formik.handleChange}
                      error={
                        formik.touched.userName &&
                        Boolean(formik.errors.userName)
                      }
                      helperText={
                        formik.touched.userName && formik.errors.userName
                      }
                    />
                  </Grid>
                  <Grid item xs={12} md={12} lg={12}>
                    <TextField
                      fullWidth
                      id="email"
                      name="email"
                      label="Email"
                      value={formik.values.email}
                      onChange={formik.handleChange}
                      error={
                        formik.touched.email && Boolean(formik.errors.email)
                      }
                      helperText={formik.touched.email && formik.errors.email}
                    />
                  </Grid>
                </Grid>
              </Box>
              <Box sx={{ marginTop: "1rem" }}>
                <Button variant="contained" type="submit">
                  Submit
                </Button>
              </Box>
            </Form>
          </>
        )}
      </Formik>
    </>
  );
};

export default FormEditProfile;
