import React, { useEffect, useState } from "react";
import { Table } from "antd";
import { BiEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { deleteACoupon, getAllCoupon } from "../features/coupon/couponSlice";
import CustomModal from "../components/CustomModal";
import { PAGE_SIZE } from "../constants/page.constants";
import { deleteVoucherApi, filterVoucherApi } from "../api/voucher.api";
import { toast } from "react-toastify";
import { Box, Button, Pagination } from "@mui/material";

const columns = [
  {
    title: "SNo",
    dataIndex: "key",
  },

  {
    title: "Voucher Code",
    dataIndex: "voucherCode",
    sorter: (a, b) => a.voucherCode.length - b.voucherCode.length,
  },
  {
    title: "Discount",
    dataIndex: "discount",
    sorter: (a, b) => a.discount - b.discount,
  },
  // {
  //   title: "Expiry",
  //   dataIndex: "expiry",
  //   sorter: (a, b) => a.name.length - b.name.length,
  // },
  {
    title: "Action",
    dataIndex: "action",
  },
];

const Couponlist = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);
  const [voucherId, setVoucherId] = useState("");
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);
  const [voucherDetail, setVoucherDetail] = useState([]);
  const [voucherItem, setVoucherItem] = useState(null);

  const showModal = (item) => {
    setOpen(true);
    setVoucherId(item?._id);
    setVoucherItem(item);
  };

  const hideModal = () => {
    setOpen(false);
  };

  const getVoucherDetail = async () => {
    const data = {
      voucherCode: "",
    };
    const params = {
      page: page,
      limit: PAGE_SIZE,
    };
    filterVoucherApi(data, params)
      .then((res) => {
        setVoucherDetail(res?.data?.data);
        setTotalPage(res?.data?.pagination?.totalPages);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getVoucherDetail();
  }, []);

  const data1 = [];
  for (let i = 0; i < voucherDetail.length; i++) {
    data1.push({
      key: i + 1,
      voucherCode: voucherDetail[i].voucherCode,
      discount: voucherDetail[i].discount,
      // expiry: new Date(voucherDetail[i].expiry).toLocaleString(),
      action: (
        <>
          <Link
            to={`/admin/coupon/${voucherDetail[i]._id}`}
            className=" fs-3 text-danger"
            state={{ voucherCode: voucherDetail[i].voucherCode }}
          >
            <BiEdit />
          </Link>
          <button
            className="ms-3 fs-3 text-danger bg-transparent border-0"
            onClick={() => showModal(voucherDetail[i])}
          >
            <AiFillDelete />
          </button>
        </>
      ),
    });
  }

  const handleClickBtnAddVoucher = () => {
    navigate("/admin/coupon");
  };

  const deleteVoucher = (e) => {
    const data = {
      voucherCode: voucherItem?.voucherCode,
    };

    deleteVoucherApi(data)
      .then((res) => {
        if (res) {
          setOpen(false);
          setTimeout(() => {
            getVoucherDetail();
          }, 100);
          toast.success("Delete voucher successful");
        } else {
          toast.error("Error");
        }
      })
      .catch((err) => {
        toast.error(err);
      });
  };

  const onChangePage = (e, pageNumber) => {
    setPage(pageNumber);
  };

  return (
    <div>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h3 className="mb-4 title">Vouchers</h3>
        <Button
          sx={{ marginBottom: "1.5rem" }}
          onClick={handleClickBtnAddVoucher}
        >
          Add voucher
        </Button>
      </Box>
      <div>
        <Table pagination={false} columns={columns} dataSource={data1} />
        <Pagination page={page} count={totalPage} onChange={onChangePage} />
      </div>
      <CustomModal
        hideModal={hideModal}
        open={open}
        performAction={() => {
          deleteVoucher(voucherId);
        }}
        title="Are you sure you want to delete this Voucher?"
      />
    </div>
  );
};

export default Couponlist;
