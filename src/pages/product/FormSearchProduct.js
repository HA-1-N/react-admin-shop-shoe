import { Box, Button, Grid, Stack, TextField } from "@mui/material";
import { Form, Formik } from "formik";
import React from "react";
import * as Yup from "yup";
import { filterProductApi } from "../../api/product.api";
import { PAGE_SIZE } from "../../constants/page.constants";

const FormSearchProduct = (props) => {
  const { page, setProductDetail, setTotalCount } = props;

  const initialValues = {
    productCode: "",
    brandCode: "",
    name: "",
    color: [],
    size: [],
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
    filterProductApi(newValues, params).then((res) => {
      const data = res?.data?.data;
      setProductDetail(data);
      setTotalCount(res?.data?.pagination?.totalPages);
    });
  };

  const handleCancel = (formik) => {
    formik.resetForm();
    const params = {
      page: 1,
      limit: PAGE_SIZE,
    };
    filterProductApi(initialValues, params).then((res) => {
      const data = res?.data?.data;
      setProductDetail(data);
      setTotalCount(res?.data?.pagination?.totalPages);
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
                      id="productCode"
                      name="productCode"
                      label="Product Code"
                      value={formik.values.productCode}
                      onChange={formik.handleChange}
                      error={
                        formik.touched.productCode &&
                        Boolean(formik.errors.productCode)
                      }
                      helperText={
                        formik.touched.productCode && formik.errors.productCode
                      }
                      size="small"
                    />
                  </Grid>

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

export default FormSearchProduct;
