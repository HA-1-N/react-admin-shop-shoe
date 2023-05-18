import React, { useEffect, useState } from "react";
import { Form, Formik, useFormik } from "formik";
import * as Yup from "yup";
import { Box, Button, Grid, TextField, Typography } from "@mui/material";
import Select from "react-select";
import { adminRequest } from "../../utils/axios-config-admin";
import { getProduct, updateProduct } from "../../api/product.api";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { filterSizeApi } from "../../api/size.api";
import { filterCategoryApi } from "../../api/category.api";

const customStyles = {
  control: (provided, state) => ({
    ...provided,
    height: "60px",
    background: "#f5f5f5",
  }),
  option: (provided, state) => ({
    ...provided,
    zIndex: 100,
  }),
};

const categoriesOtp = [
  {
    value: "sport",
    label: "Thể thao",
  },
  {
    value: "street",
    label: "Đường phố",
  },
];

const sizeOpt = [
  {
    value: "35",
    label: "35",
  },
  {
    value: "36",
    label: "36",
  },
  {
    value: "37",
    label: "37",
  },
  {
    value: "38",
    label: "38",
  },
  {
    value: "39",
    label: "39",
  },
  {
    value: "40",
    label: "40",
  },
  {
    value: "41",
    label: "41",
  },
  {
    value: "42",
    label: "42",
  },
  {
    value: "43",
    label: "43",
  },
  {
    value: "44",
    label: "44",
  },
  {
    value: "45",
    label: "45",
  },
];

const FormUpdateProduct = () => {
  const defaultInitialValues = {
    productCode: "",
    name: "",
    description: "",
    size: "",
    price: "",
    brandCode: "",
    categories: "",
    color: "",
    image: "",
  };

  const navigate = useNavigate();
  const params = useParams();
  const paramProductCode = params.productCode;

  const [initialValues, setInitialValues] = useState(defaultInitialValues);
  const [brandDetail, setBrandDetail] = useState([]);
  const [colorDetail, setColorDetail] = useState([]);
  const [sizeDetail, setSizeDetail] = useState([]);
  const [categoryDetail, setCategoryDetail] = useState([]);
  const [productDetail, setProductDetail] = useState(null);

  const validationSchema = Yup.object({
    productCode: Yup.string().nullable().required("Product code is required"),
    name: Yup.string().nullable().required("Name is Required"),
    description: Yup.string().nullable().required("Description is Required"),
    size: Yup.array()
      .nullable()
      .min(1, "Pick at least one size")
      .required("Size is required"),
    price: Yup.number().nullable().required("Price is Required"),
    brandCode: Yup.object().nullable().required("Name is Required"),
    categories: Yup.array()
      .nullable()
      .min(1, "Pick at least one categories")
      .required("categories is Required"),
    color: Yup.array()
      .nullable()
      .min(1, "Pick at least one color")
      .required("Color is Required"),
    image: Yup.string().nullable().required("image is Required"),
  });

  const getBrandsDetail = async () => {
    const data = {
      brandCode: "",
      name: "",
    };
    const params = {
      page: 1,
      limit: 10000,
    };

    await adminRequest.post("/brand/filter", data, { params }).then((res) => {
      const data = res?.data?.data;
      setBrandDetail(data);
    });
  };

  const getColorsDetail = async () => {
    const data = {
      colorCode: "",
      colorName: "",
    };
    const params = {
      page: 1,
      limit: 10000,
    };

    await adminRequest.post("/color/filter", data, { params }).then((res) => {
      const data = res?.data?.data;
      setColorDetail(data);
    });
  };

  const buildInitialValues = (product) => {
    const valueForm = {
      productCode: product.productCode,
      name: product.name,
      description: product.description,
      price: product.price,
      brandCode: product.brand,
      categories: product.categoriesArrObj,
      size: product.sizes,
      color: product.colors,
      image: product.image,
    };
    return valueForm;
  };

  const getSizesDetail = async () => {
    const data = {
      sizeCode: "",
      sizeName: "",
    };
    const params = {
      page: 1,
      limit: 10000,
    };

    filterSizeApi(data, params)
      .then((res) => {
        const data = res?.data?.data;
        setSizeDetail(data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getCategoryDetail = async () => {
    const data = {
      categoryName: "",
    };
    const params = {
      page: 1,
      limit: 10000,
    };

    filterCategoryApi(data, params)
      .then((res) => {
        const data = res?.data?.data;
        setCategoryDetail(data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getProductDetail = async () => {
    getProduct(paramProductCode)
      .then((res) => {
        setProductDetail(res?.data);
        setInitialValues(buildInitialValues(res?.data));
      })
      .catch((err) => {
        console.log("err", err);
      });
  };

  useEffect(() => {
    getBrandsDetail();
    getColorsDetail();
    getSizesDetail();
    getCategoryDetail();
    getProductDetail();
  }, []);

  const handleChangeBrandCode = (formik) => (e) => {
    formik.setFieldValue("brandCode", e);
  };

  const handleChangeCategories = (formik) => (e) => {
    formik.setFieldValue("categories", e);
  };

  const handleChangeSize = (formik) => (e) => {
    formik.setFieldValue("size", e);
  };

  const handleChangeColor = (formik) => (e) => {
    formik.setFieldValue("color", e);
  };

  const buildBodyUpload = (values) => {
    const arrSize = values?.size?.map((item) =>
      item?.sizeCode ? item?.sizeCode : item
    );
    const arrColor = values?.color?.map((item) =>
      item?.colorCode ? item?.colorCode : item
    );

    const arrCategories = values?.categories?.map((item) =>
      item?.categoryName ? item?.categoryName : item
    );

    const newValues = {
      ...values,
      brandCode: values.brandCode?.brandCode,
      size: arrSize,
      color: arrColor,
      categories: arrCategories,
    };
    return newValues;
  };

  const handleOnSubmit = async (values, formik) => {
    const newValues = buildBodyUpload(values);
    updateProduct(newValues, paramProductCode)
      .then((res) => {
        toast.success("Update product successful !");
        navigate("/admin/list-product");
      })
      .catch((err) => {
        console.log(err);
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
                  <Grid item xs={12} md={12} lg={12}>
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
                    />
                  </Grid>

                  <Grid item xs={12} md={12} lg={12}>
                    <TextField
                      fullWidth
                      id="name"
                      name="name"
                      label="Name"
                      value={formik.values.name}
                      onChange={formik.handleChange}
                      error={formik.touched.name && Boolean(formik.errors.name)}
                      helperText={formik.touched.name && formik.errors.name}
                    />
                  </Grid>

                  <Grid item xs={12} md={12} lg={12}>
                    <TextField
                      fullWidth
                      id="description"
                      name="description"
                      label="Description"
                      value={formik.values.description}
                      onChange={formik.handleChange}
                      error={
                        formik.touched.description &&
                        Boolean(formik.errors.description)
                      }
                      helperText={
                        formik.touched.description && formik.errors.description
                      }
                    />
                  </Grid>

                  <Grid item xs={12} md={12} lg={12}>
                    <TextField
                      fullWidth
                      id="price"
                      name="price"
                      label="Price"
                      value={formik.values.price}
                      onChange={formik.handleChange}
                      error={
                        formik.touched.price && Boolean(formik.errors.price)
                      }
                      helperText={formik.touched.price && formik.errors.price}
                    />
                  </Grid>

                  <Grid item xs={12} md={12} lg={12}>
                    <Typography> Brand code</Typography>
                    <Select
                      className="basic-single"
                      classNamePrefix="select"
                      fullWidth
                      isClearable={true}
                      name="brandCode"
                      id="brandCode"
                      type="text"
                      placeholder="Select Brand Code"
                      onBlur={formik.handleBlur}
                      onChange={handleChangeBrandCode(formik)}
                      value={formik.values.brandCode}
                      options={brandDetail}
                      getOptionLabel={(option) => option.name}
                      getOptionValue={(option) => option.brandCode}
                      styles={customStyles}
                    />
                    <div className="error">
                      {formik.touched.brandCode && formik.errors.brandCode}
                    </div>
                  </Grid>

                  <Grid item xs={12} md={12} lg={12}>
                    <Typography> Categories</Typography>
                    <Select
                      className="basic-single"
                      classNamePrefix="select"
                      isMulti
                      fullWidth
                      isClearable={true}
                      name="categories"
                      id="categories"
                      type="text"
                      placeholder="Select Categories"
                      onBlur={formik.handleBlur}
                      onChange={handleChangeCategories(formik)}
                      value={formik.values.categories}
                      options={categoryDetail}
                      styles={customStyles}
                      getOptionLabel={(option) => option.categoryName}
                      getOptionValue={(option) => option.categoryName}
                    />
                    <div className="error">
                      {formik.touched.categories && formik.errors.categories}
                    </div>
                  </Grid>

                  {/* Size */}
                  <Grid item xs={12} md={12} lg={12}>
                    <Typography>Size</Typography>
                    <Select
                      className="basic-single"
                      classNamePrefix="select"
                      fullWidth
                      isMulti
                      isClearable={true}
                      name="size"
                      id="size"
                      type="text"
                      placeholder="Select Size"
                      onBlur={formik.handleBlur}
                      onChange={handleChangeSize(formik)}
                      value={formik.values.size}
                      options={sizeDetail}
                      getOptionLabel={(option) => option.sizeName}
                      getOptionValue={(option) => option.sizeCode}
                      styles={customStyles}
                    />
                    <div className="error">
                      {formik.touched.size && formik.errors.size}
                    </div>
                  </Grid>

                  {/* Color */}
                  <Grid item xs={12} md={12} lg={12}>
                    <Typography>Color</Typography>
                    <Select
                      className="basic-single"
                      classNamePrefix="select"
                      fullWidth
                      isMulti
                      isClearable={true}
                      name="color"
                      id="color"
                      type="text"
                      placeholder="Select color"
                      onBlur={formik.handleBlur}
                      onChange={handleChangeColor(formik)}
                      value={formik.values.color}
                      options={colorDetail}
                      getOptionLabel={(option) => option.colorName}
                      getOptionValue={(option) => option.colorCode}
                      styles={customStyles}
                      menuPlacement="top"
                    />
                    <div className="error">
                      {formik.touched.color && formik.errors.color}
                    </div>
                  </Grid>

                  <Grid item xs={12} md={12} lg={12}>
                    <TextField
                      fullWidth
                      id="image"
                      name="image"
                      label="Image"
                      value={formik.values.image}
                      onChange={formik.handleChange}
                      error={
                        formik.touched.image && Boolean(formik.errors.image)
                      }
                      helperText={formik.touched.image && formik.errors.image}
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

export default FormUpdateProduct;
