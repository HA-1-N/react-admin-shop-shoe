import { Box, Button, Grid, Stack, TextField } from "@mui/material";
import { Form, Formik } from "formik";
import React from "react";
import * as Yup from "yup";
import { filterCategoryApi } from "../../api/category.api";
import { PAGE_SIZE } from "../../constants/page.constants";

const FormSearchCategory = (props) => {
  const { page, setCategoryDetail, setTotalPage } = props;

  const initialValues = {
    categoryName: "",
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
    filterCategoryApi(newValues, params).then((res) => {
      const data = res?.data?.data;
      setCategoryDetail(data);
      setTotalPage(res?.data?.pagination?.totalPages);
    });
  };

  const handleCancel = (formik) => {
    formik.resetForm();
    const params = {
      page: 1,
      limit: PAGE_SIZE,
    };
    filterCategoryApi(initialValues, params).then((res) => {
      const data = res?.data?.data;
      setCategoryDetail(data);
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
                      id="categoryName"
                      name="categoryName"
                      label="Category Name"
                      value={formik.values.categoryName}
                      onChange={formik.handleChange}
                      error={
                        formik.touched.categoryName &&
                        Boolean(formik.errors.categoryName)
                      }
                      helperText={
                        formik.touched.categoryName &&
                        formik.errors.categoryName
                      }
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

export default FormSearchCategory;
