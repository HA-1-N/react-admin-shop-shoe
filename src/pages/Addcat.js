import { React, useEffect, useState } from "react";
import CustomInput from "../components/CustomInput";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import * as yup from "yup";
import { useFormik } from "formik";
import {
  createCategory,
  getAProductCategory,
  resetState,
  updateAProductCategory,
} from "../features/pcategory/pcategorySlice";
import {
  createCategoryApi,
  getCategoryByNameApi,
  updateCategoryApi,
} from "../api/category.api";

let schema = yup.object().shape({
  categoryName: yup.string().required("Category Name is Required"),
});
const Addcat = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const params = useParams();
  const navigate = useNavigate();
  const categoryId = params.id;
  const categoryNameLocation = location.state?.categoryName;

  const [categoryNameDetail, setCategoryNameDetail] = useState("");

  useEffect(() => {
    if (categoryId !== undefined) {
      const data = {
        categoryName: categoryNameLocation,
      };
      getCategoryByNameApi(data).then((res) => {
        const data = res?.data?.data;
        setCategoryNameDetail(data?.categoryName);
      });
    } else {
      dispatch(resetState());
    }
  }, [categoryId]);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      categoryName: categoryNameDetail || "",
    },
    validationSchema: schema,
    onSubmit: (values) => {
      if (categoryId !== undefined) {
        const data = {
          ...values,
        };
        updateCategoryApi(data, categoryId)
          .then((res) => {
            if (res) {
              formik.resetForm();
              setTimeout(() => {
                dispatch(resetState());
              }, 300);
              navigate("/admin/list-category");
              toast.success("Update Category successful !");
            } else {
              toast.error("Error !");
            }
          })
          .catch((err) => {
            toast.error(err);
          });
      } else {
        const data = {
          ...values,
        };
        createCategoryApi(data, categoryId)
          .then((res) => {
            if (res) {
              formik.resetForm();
              setTimeout(() => {
                dispatch(resetState());
              }, 300);
              navigate("/admin/list-category");
              toast.success("Create Category successful !");
            } else {
              toast.error("Error !");
            }
          })
          .catch((err) => {
            toast.error(err);
          });
      }
    },
  });
  return (
    <div>
      <h3 className="mb-4  title">
        {categoryId !== undefined ? "Edit" : "Add"} Category
      </h3>
      <div>
        <form action="" onSubmit={formik.handleSubmit}>
          <CustomInput
            type="text"
            label="Enter Product Category"
            onChng={formik.handleChange("categoryName")}
            onBlr={formik.handleBlur("categoryName")}
            val={formik.values.categoryName}
            id="categoryName"
          />
          <div className="error">
            {formik.touched.categoryName && formik.errors.categoryName}
          </div>
          <button
            className="btn btn-success border-0 rounded-3 my-5"
            type="submit"
          >
            {categoryId !== undefined ? "Edit" : "Add"} Category
          </button>
        </form>
      </div>
    </div>
  );
};

export default Addcat;
