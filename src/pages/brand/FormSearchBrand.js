import { Box, Button, Grid, Stack, TextField } from "@mui/material";
import { Form, Formik } from "formik";
import React from "react";
import * as Yup from "yup";
import { filterBrandApi } from "../../api/brand.api";
import { PAGE_SIZE } from "../../constants/page.constants";

const FormSearchBrand = (props) => {
  const { page, setBrandDetail, setTotalPage } = props;

  const initialValues = {
    brandCode: "",
    name: "",
  };

  const validationSchema = Yup.object({});

  const buildBody = (values) => {
    const newValues = {
      ...values,
    };
    return newValues;
  };

  const handleOnSubmit = async (values, formikHelper) => {
    const newValues = buildBody(values);
    const params = {
      page: page,
      limit: PAGE_SIZE,
    };
    filterBrandApi(newValues, params).then((res) => {
      const data = res?.data?.data;
      setBrandDetail(data);
      setTotalPage(res?.data?.pagination?.totalPages);
    });
  };

  const handleCancel = (formik) => {
    formik.resetForm();
    const params = {
      page: 1,
      limit: PAGE_SIZE,
    };
    filterBrandApi(initialValues, params).then((res) => {
      const data = res?.data?.data;
      setBrandDetail(data);
      setTotalPage(res?.data?.pagination?.totalPages);
    });
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
                  <Grid item xs={12} md={6} lg={4}>
                    <TextField
                      fullWidth
                      id="brandCode"
                      name="brandCode"
                      label="Brand Code"
                      value={formik.values.brandCode}
                      onChange={formik.handleChange}
                      error={
                        formik.touched.brandCode &&
                        Boolean(formik.errors.brandCode)
                      }
                      helperText={
                        formik.touched.brandCode && formik.errors.brandCode
                      }
                      size="small"
                    />
                  </Grid>

                  <Grid item xs={12} md={6} lg={4}>
                    <TextField
                      fullWidth
                      id="name"
                      name="name"
                      label="Name"
                      value={formik.values.name}
                      onChange={formik.handleChange}
                      error={formik.touched.name && Boolean(formik.errors.name)}
                      helperText={formik.touched.name && formik.errors.name}
                      size="small"
                    />
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    justifyContent="center"
                    alignItems="center"
                  >
                    <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
                      <Button
                        variant="contained"
                        color="secondary"
                        type="button"
                        onMouseDown={() => handleCancel(formik)}
                      >
                        Huỷ
                      </Button>
                      <Button variant="contained" color="primary" type="submit">
                        Tìm kiếm
                      </Button>
                    </Stack>
                  </Grid>
                </Grid>
              </Box>
            </Form>
          </>
        )}
      </Formik>
    </>
  );
};

export default FormSearchBrand;
