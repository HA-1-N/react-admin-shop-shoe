import { React, useEffect, useState } from "react";
import CustomInput from "../components/CustomInput";
import ReactQuill from "react-quill";
import { useNavigate } from "react-router-dom";
import "react-quill/dist/quill.snow.css";
import { toast } from "react-toastify";
import * as yup from "yup";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { Select } from "antd";
import Dropzone from "react-dropzone";
import { delImg, uploadImg } from "../features/upload/uploadSlice";
import { createProducts, resetState } from "../features/product/productSlice";
import { filterBrandApi } from "../api/brand.api";
import axios from "axios";
import { HTTP_MGMT } from "../utils/domain-config";
import { adminRequest } from "../utils/axios-config-admin";
import { createProduct } from "../api/product.api";
import { filterCategoryApi } from "../api/category.api";
import { filterColorApi } from "../api/color.api";
import { filterSizeApi } from "../api/size.api";
import { MdOutlineClose } from "react-icons/md";
import clsx from "clsx";
import styles from "../css/CreateProduct.module.css";
import { convertObjectToApplicationJsonFormData } from "../utils/axios.util";

let schema = yup.object().shape({
  productCode: yup.string().required("productCode is Required"),
  name: yup.string().required("Name is Required"),
  description: yup.string().required("Description is Required"),
  size: yup
    .array()
    .min(1, "Pick at least one size")
    .required("Size is required"),
  price: yup.number().required("Price is Required"),
  brandCode: yup.string().required("Name is Required"),
  categories: yup
    .array()
    .min(1, "Pick at least one categories")
    .required("categories is Required"),
  color: yup
    .array()
    .min(1, "Pick at least one color")
    .required("Color is Required"),
  // image: yup.string().required("image is Required"),
  // quantity: yup.number().required("Quantity is Required"),
});

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

const Addproduct = () => {
  const imageMaxSize = 5;

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [color, setColor] = useState([]);
  const [brand, setBrand] = useState([]);
  const [size, setSize] = useState([]);
  const [categories, setCategories] = useState([]);
  const [images, setImages] = useState([]);
  const [arrImages, setArrImages] = useState([]);

  const [brandDetail, setBrandDetail] = useState([]);
  const [colorDetail, setColorDetail] = useState([]);
  const [sizeDetail, setSizeDetail] = useState([]);
  const [categoryDetail, setCategoryDetail] = useState([]);

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

  useEffect(() => {
    getBrandsDetail();
    getColorsDetail();
    getSizesDetail();
    getCategoryDetail();
  }, []);

  const coloropt = [];
  colorDetail.forEach((i) => {
    coloropt.push({
      label: i.colorName,
      value: i.colorCode,
    });
  });

  const brandopt = [];
  brandDetail.forEach((i) => {
    brandopt.push({
      label: i.name,
      value: i.brandCode,
    });
  });

  const sizeopt = [];
  sizeDetail.forEach((i) => {
    sizeopt.push({
      label: i.sizeName,
      value: i.sizeCode,
    });
  });

  const categoriesopt = [];
  categoryDetail.forEach((i) => {
    categoriesopt.push({
      label: i.categoryName,
      value: i.categoryName,
    });
  });

  // const img = [];
  // imgState.forEach((i) => {
  //   img.push({
  //     public_id: i.public_id,
  //     url: i.url,
  //   });
  // });

  useEffect(() => {
    formik.values.color = color ? color : " ";
    // formik.values.brand = brand ? brand : " ";
    formik.values.size = size ? size : " ";
    formik.values.categories = categories ? categories : " ";
    // formik.values.images = img;
  }, [color, categories, size]);

  const buildBody = (values) => {
    const bodyFormData = new FormData();
    bodyFormData.append("productCode", values.productCode);
    bodyFormData.append("brandCode", values.brandCode);
    bodyFormData.append("name", values.name);
    // bodyFormData.append("color", values?.color);
    // bodyFormData.append("size", values?.size);
    bodyFormData.append("price", Number(values?.price));
    // bodyFormData.append("categories", values.categories);
    bodyFormData.append("description", values.description);

    for (let index = 0; index < size.length; index++) {
      const element = size[index];
      bodyFormData.append("size", element);
    }

    for (let index = 0; index < color.length; index++) {
      const element = color[index];
      bodyFormData.append("color", element);
    }

    for (let index = 0; index < categories.length; index++) {
      const element = categories[index];
      bodyFormData.append("categories", element);
    }

    for (let index = 0; index < images.length; index++) {
      const element = images[index];
      bodyFormData.append("image", element);
    }
    return bodyFormData;
  };

  const formik = useFormik({
    initialValues: {
      productCode: "",
      name: "",
      description: "",
      size: "",
      price: "",
      brandCode: "",
      categories: "",
      color: "",
      // image: "",
      // quantity: "",
    },
    validationSchema: schema,
    onSubmit: (values) => {
      const newValue = buildBody(values);
      createProduct(newValue)
        .then((res) => {
          if (res) {
            formik.resetForm();
            setColor([]);
            setCategories([]);
            setSize([]);
            setTimeout(() => {
              dispatch(resetState());
            }, 3000);
            toast.success("Create product successful !");
            navigate("/admin/list-product");
          }
        })
        .catch((err) => {
          toast.error(err);
        });
    },
  });
  const handleColors = (e) => {
    setColor(e);
  };

  // const handleChangeBrand = (e) => {
  //   setBrand(e);
  // };

  const handleChangeSize = (e) => {
    setSize(e);
  };

  const handleChangeCategories = (e) => {
    setCategories(e);
  };

  const handleChangeImage = (formik) => (e) => {
    const files = e.target.files;
    const arrFile = [];
    for (let index = 0; index < files.length; index++) {
      const element = files[index];
      arrFile.push(element);
    }
    setImages(arrFile);
  };

  const handleDeleteImage = (item, index) => {
    const newArrFile = images?.filter((item, i) => index !== i);
    setImages(newArrFile);
  };

  return (
    <div>
      <h3 className="mb-4 title">Add Product</h3>
      <div>
        <form
          onSubmit={formik.handleSubmit}
          className="d-flex gap-3 flex-column"
        >
          {/* <>{JSON.stringify(formik.values)}</> */}
          <CustomInput
            type="text"
            label="Enter Product code"
            name="productCode"
            onChng={formik.handleChange("productCode")}
            onBlr={formik.handleBlur("productCode")}
            val={formik.values.productCode}
          />
          <div className="error">
            {formik.touched.productCode && formik.errors.productCode}
          </div>
          <CustomInput
            type="text"
            label="Enter name"
            name="name"
            onChng={formik.handleChange("name")}
            onBlr={formik.handleBlur("name")}
            val={formik.values.name}
          />
          <div className="error">
            {formik.touched.name && formik.errors.name}
          </div>

          <div className="">
            <ReactQuill
              theme="snow"
              name="description"
              onChange={formik.handleChange("description")}
              value={formik.values.description}
            />
          </div>
          <div className="error">
            {formik.touched.description && formik.errors.description}
          </div>
          <CustomInput
            type="number"
            label="Enter Product Price"
            name="price"
            onChng={formik.handleChange("price")}
            onBlr={formik.handleBlur("price")}
            val={formik.values.price}
          />

          <div className="error">
            {formik.touched.price && formik.errors.price}
          </div>

          {/* Brand */}
          <select
            name="brandCode"
            onChange={formik.handleChange("brandCode")}
            onBlur={formik.handleBlur("brandCode")}
            value={formik.values.brandCode}
            className="form-control py-3 mb-3"
            id=""
          >
            <option value="" disabled>
              Select Brand
            </option>
            {brandDetail.map((i, j) => {
              return (
                <option key={j} value={i.brandCode}>
                  {i.name}
                </option>
              );
            })}
          </select>

          <div className="error">
            {formik.touched.brand && formik.errors.brand}
          </div>

          {/* categories */}
          <Select
            mode="multiple"
            allowClear
            className="w-100"
            placeholder="Select categories"
            value={categories}
            onChange={(i) => handleChangeCategories(i)}
            options={categoriesopt}
            styles={customStyles}
          />
          <div className="error">
            {formik.touched.categories && formik.errors.categories}
          </div>

          {/* Size */}
          <Select
            mode="multiple"
            allowClear
            className="w-100"
            placeholder="Select sizes"
            value={size}
            onChange={(i) => handleChangeSize(i)}
            options={sizeopt}
            styles={{ height: "60px", background: "#f5f5f5" }}
          />
          <div className="error">
            {formik.touched.size && formik.errors.size}
          </div>

          <Select
            mode="multiple"
            allowClear
            className="w-100"
            placeholder="Select colors"
            value={color}
            onChange={(i) => handleColors(i)}
            options={coloropt}
            styles={customStyles}
          />
          <div className="error">
            {formik.touched.color && formik.errors.color}
          </div>
          {/* <CustomInput
            type="number"
            label="Enter Product Quantity"
            name="quantity"
            onChng={formik.handleChange("quantity")}
            onBlr={formik.handleBlur("quantity")}
            val={formik.values.quantity}
          />
          <div className="error">
            {formik.touched.quantity && formik.errors.quantity}
          </div> */}

          {/* <div className="showimages d-flex flex-wrap gap-3">
            {imgState?.map((i, j) => {
              return (
                <div className=" position-relative" key={j}>
                  <button
                    type="button"
                    onClick={() => dispatch(delImg(i.public_id))}
                    className="btn-close position-absolute"
                    style={{ top: "10px", right: "10px" }}
                  ></button>
                  <img
                    src={`E://android//project-shop-shoe//api//src//middlewares//upload//images${i.path}`}
                    alt=""
                    width={200}
                    height={200}
                  />
                </div>
              );
            })}
          </div> */}
          <input
            type="file"
            label="Enter Product image"
            name="image"
            id="image"
            multiple
            onChange={handleChangeImage(formik)}
          />
          <div style={{ display: "flex" }}>
            {images?.length > 0 &&
              images?.map((item, index) => {
                item.preview = URL.createObjectURL(item);
                return (
                  <div
                    key={index}
                    style={{ margin: "0 0.4rem", position: "relative" }}
                  >
                    <img
                      src={item?.preview}
                      alt="images"
                      style={{
                        height: "76px",
                        width: "112px",
                      }}
                    />
                    <div
                      style={{
                        cursor: "pointer",
                        position: "absolute",
                        right: 0,
                        top: 0,
                        fontSize: "1.6rem",
                      }}
                      onClick={() => handleDeleteImage(item, index)}
                    >
                      <MdOutlineClose />
                    </div>
                  </div>
                );
              })}
          </div>

          <button
            className="btn btn-success border-0 rounded-3 my-5"
            type="submit"
          >
            Add Product
          </button>
        </form>
      </div>
    </div>
  );
};

export default Addproduct;
