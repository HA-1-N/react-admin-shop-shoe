import { React, useEffect, useState } from "react";
import CustomInput from "../components/CustomInput";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import * as yup from "yup";
import { useFormik } from "formik";
import { resetState } from "../features/brand/brandSlice";
import {
  getBrandByCodeApi,
  updateBrandApi,
  createBrandApi,
} from "../api/brand.api";

let schema = yup.object().shape({
  brandCode: yup.string().required("Brand Code is Required"),
  name: yup.string().required("Brand Name is Required"),
});
const Addbrand = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const params = useParams();
  const brandCodeParam = params.brandCode;

  const [brandCodeDetail, setBrandCodeDetail] = useState("");
  const [brandNameDetail, setBrandNameDetail] = useState("");

  useEffect(() => {
    if (brandCodeParam !== undefined) {
      const data = {
        brandCode: brandCodeParam,
      };
      getBrandByCodeApi(data).then((res) => {
        setBrandCodeDetail(res?.data?.brandCode);
        setBrandNameDetail(res?.data?.name);
      });
    } else {
      dispatch(resetState());
    }
  }, [brandCodeParam]);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      brandCode: brandCodeDetail || "",
      name: brandNameDetail || "",
    },
    validationSchema: schema,
    onSubmit: async (values) => {
      if (brandCodeParam !== undefined) {
        const data = {
          ...values,
        };
        updateBrandApi(data, brandCodeParam)
          .then((res) => {
            if (res) {
              formik.resetForm();
              setTimeout(() => {
                dispatch(resetState());
              }, 300);
              navigate("/admin/list-brand");
              toast.success("Update Brand successful !");
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
        createBrandApi(data, brandCodeParam)
          .then((res) => {
            if (res) {
              formik.resetForm();
              setTimeout(() => {
                dispatch(resetState());
              }, 300);
              navigate("/admin/list-brand");
              toast.success("Create Brand successful !");
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
      <h3 className="mb-4 title">
        {brandCodeParam !== undefined ? "Edit" : "Add"} Brand
      </h3>
      <div>
        <form action="" onSubmit={formik.handleSubmit}>
          <CustomInput
            type="text"
            name="brandCode"
            onChng={formik.handleChange("brandCode")}
            onBlr={formik.handleBlur("brandCode")}
            val={formik.values.brandCode}
            label="Enter Brand Code"
            id="brandCode"
          />
          <div className="error">
            {formik.touched.brandCode && formik.errors.brandCode}
          </div>

          <CustomInput
            type="text"
            name="name"
            onChng={formik.handleChange("name")}
            onBlr={formik.handleBlur("name")}
            val={formik.values.name}
            label="Enter Brand Name"
            id="name"
          />
          <div className="error">
            {formik.touched.name && formik.errors.name}
          </div>

          <button
            className="btn btn-success border-0 rounded-3 my-5"
            type="submit"
          >
            {brandCodeParam !== undefined ? "Edit" : "Add"} Brand
          </button>
        </form>
      </div>
    </div>
  );
};

export default Addbrand;
