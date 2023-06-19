import { React, useEffect, useState } from "react";
import CustomInput from "../components/CustomInput";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import * as yup from "yup";
import { useFormik } from "formik";
import {
  createCoupon,
  getACoupon,
  resetState,
  updateACoupon,
} from "../features/coupon/couponSlice";
import {
  createVoucherApi,
  getVoucherByCodeApi,
  updateVoucherApi,
} from "../api/voucher.api";

let schema = yup.object().shape({
  voucherCode: yup.string().required("Voucher Code is Required"),
  // expiry: yup.date().required("Expiry Date is Required"),
  discount: yup.number().required("Discount Percentage is Required"),
});
const AddCoupon = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const params = useParams();
  const voucherId = params?.id;
  const voucherCodeLocation = location.state?.voucherCode;

  const [voucherCodeDetail, setVoucherCodeDetail] = useState("");
  const [voucherDiscount, setVoucherDiscountDetail] = useState("");

  // const changeDateFormet = (date) => {
  //   const newDate = new Date(date).toLocaleDateString();
  //   const [month, day, year] = newDate.split("/");
  //   return [year, month, day].join("-");
  // };

  useEffect(() => {
    if (voucherId !== undefined) {
      const data = {
        voucherCode: voucherCodeLocation,
      };
      getVoucherByCodeApi(data).then((res) => {
        const data = res?.data?.data;
        setVoucherCodeDetail(data?.voucherCode);
        setVoucherDiscountDetail(data?.discount);
      });
    }
  }, [voucherId]);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      voucherCode: voucherCodeDetail || "",
      // expiry: changeDateFormet(couponExpiry) || "",
      discount: voucherDiscount || "",
    },
    validationSchema: schema,
    onSubmit: (values) => {
      if (voucherId !== undefined) {
        const data = {
          ...values,
        };
        updateVoucherApi(data, voucherCodeDetail)
          .then((res) => {
            if (res) {
              formik.resetForm();
              setTimeout(() => {
                navigate("/admin/coupon-list");
                toast.success("Update Voucher successful !");
              }, 300);
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
        createVoucherApi(data)
          .then((res) => {
            if (res) {
              formik.resetForm();
              setTimeout(() => {
                navigate("/admin/coupon-list");
                toast.success("Create Voucher successful !");
              }, 300);
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
        {voucherId !== undefined ? "Edit" : "Add"} Voucher
      </h3>
      <div>
        <form action="" onSubmit={formik.handleSubmit}>
          <CustomInput
            type="text"
            name="voucherCode"
            onChng={formik.handleChange("voucherCode")}
            onBlr={formik.handleBlur("voucherCode")}
            val={formik.values.voucherCode}
            label="Enter Voucher voucherCode"
            id="voucherCode"
          />
          <div className="error">
            {formik.touched.voucherCode && formik.errors.voucherCode}
          </div>
          {/* <CustomInput
            type="date"
            name="expiry"
            onChng={formik.handleChange("expiry")}
            onBlr={formik.handleBlur("expiry")}
            val={formik.values.expiry}
            label="Enter Expiry Data"
            id="date"
          /> */}
          {/* <div className="error">
            {formik.touched.expiry && formik.errors.expiry}
          </div> */}
          <CustomInput
            type="number"
            name="discount"
            onChng={formik.handleChange("discount")}
            onBlr={formik.handleBlur("discount")}
            val={formik.values.discount}
            label="Enter Discount"
            id="discount"
          />
          <div className="error">
            {formik.touched.discount && formik.errors.discount}
          </div>
          <button
            className="btn btn-success border-0 rounded-3 my-5"
            type="submit"
          >
            {voucherId !== undefined ? "Edit" : "Add"} Voucher
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddCoupon;
