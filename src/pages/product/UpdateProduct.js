import { React, useEffect, useState } from "react";
import ReactQuill from "react-quill";
import { useNavigate, useParams } from "react-router-dom";
import "react-quill/dist/quill.snow.css";
import { toast } from "react-toastify";
import * as yup from "yup";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { Select } from "antd";
import Dropzone from "react-dropzone";
import { getProduct, updateProduct } from "../../api/product.api";
import { adminRequest } from "../../utils/axios-config-admin";
import CustomInput from "../../components/CustomInput";

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
  image: yup.string().required("image is Required"),
  // quantity: yup.number().required("Quantity is Required"),
});

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

const UpdateProduct = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();
  const productCodeParams = params?.productCode;

  const [color, setColor] = useState([]);
  const [brand, setBrand] = useState([]);
  const [size, setSize] = useState([]);
  const [categories, setCategories] = useState([]);
  const [images, setImages] = useState([]);

  const [productDetail, setProductDetail] = useState([]);
  console.log("productDetail...", productDetail);
  const [brandDetail, setBrandDetail] = useState([]);
  const [colorDetail, setColorDetail] = useState([]);
  const [sizeDetail, setSizeDetail] = useState([]);

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

  const getProductByProductCode = () => {
    getProduct(productCodeParams)
      .then((res) => {
        const product = res?.data;
        setProductDetail(product);
      })
      .catch((err) => {
        toast.error(err);
      });
  };

  useEffect(() => {
    getProductByProductCode();
    getBrandsDetail();
    getColorsDetail();
  }, []);

  // const imgState = useSelector((state) => state.upload.images);
  // const newProduct = useSelector((state) => state.product);
  // const { isSuccess, isError, isLoading, createdProduct } = newProduct;
  // useEffect(() => {
  //   if (isSuccess && createdProduct) {
  //     toast.success("Product Added Successfullly!");
  //   }
  //   if (isError) {
  //     toast.error("Something Went Wrong!");
  //   }
  // }, [isSuccess, isError, isLoading]);

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

  const formik = useFormik({
    initialValues: {
      productCode: productDetail?.productCode ? productDetail?.productCode : "",
      name: productDetail?.name ? productDetail?.name : "",
      description: productDetail?.description ? productDetail?.description : "",
      size: productDetail?.size ? productDetail?.size : "",
      price: "",
      brandCode: "",
      categories: "",
      color: "",
      image: "",
      // quantity: "",
      // images: "",
    },
    validationSchema: schema,
    onSubmit: (values) => {
      updateProduct(values)
        .then((res) => {
          if (res) {
            formik.resetForm();
            setColor([]);
            setCategories([]);
            setSize([]);
            // setTimeout(() => {
            //   dispatch(resetState());
            // }, 3000);
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

  return (
    <div>
      <h3 className="mb-4 title">Add Product</h3>
      <div>
        <form
          onSubmit={formik.handleSubmit}
          className="d-flex gap-3 flex-column"
        >
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
            options={categoriesOtp}
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
            options={sizeOpt}
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
          {/* <div className="bg-white border-1 p-5 text-center">
            <Dropzone
              onDrop={(acceptedFiles) => dispatch(uploadImg(acceptedFiles))}
            >
              {({ getRootProps, getInputProps }) => (
                <section>
                  <div {...getRootProps()}>
                    <input {...getInputProps()} />
                    <p>
                      Drag 'n' drop some files here, or click to select files
                    </p>
                  </div>
                </section>
              )}
            </Dropzone>
          </div>
          <div className="showimages d-flex flex-wrap gap-3">
            {imgState?.map((i, j) => {
              return (
                <div className=" position-relative" key={j}>
                  <button
                    type="button"
                    onClick={() => dispatch(delImg(i.public_id))}
                    className="btn-close position-absolute"
                    style={{ top: "10px", right: "10px" }}
                  ></button>
                  <img src={i.url} alt="" width={200} height={200} />
                </div>
              );
            })}
          </div> */}
          <CustomInput
            type="text"
            label="Enter Product image"
            name="image"
            onChng={formik.handleChange("image")}
            onBlr={formik.handleBlur("image")}
            val={formik.values.image}
          />
          <div className="error">
            {formik.touched.image && formik.errors.image}
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

export default UpdateProduct;
