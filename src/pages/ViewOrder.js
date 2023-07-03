import React, { useEffect, useState } from "react";
import { Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { BiEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { getOrderByUser, getOrders } from "../features/auth/authSlice";
import { Box } from "@mui/material";
import HeaderCommon from "../components/HeaderCommon";
import { getOrderByIdApi } from "../api/order.api";

const columns = [
  {
    title: "SNo",
    dataIndex: "key",
  },
  {
    title: "Product Name",
    dataIndex: "name",
  },
  {
    title: "Brand",
    dataIndex: "brand",
  },
  {
    title: "Count",
    dataIndex: "count",
  },
  {
    title: "Color",
    dataIndex: "color",
  },
  {
    title: "Amount",
    dataIndex: "amount",
  },
  {
    title: "Date",
    dataIndex: "date",
  },

  // {
  //   title: "Action",
  //   dataIndex: "action",
  // },
];

const ViewOrder = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();
  const orderId = params.id;

  const [orderDetail, setOrderDetail] = useState("");
  const [productOrderDetail, setProductOrderDetail] = useState([]);

  const getOrderDetail = () => {
    getOrderByIdApi(orderId).then((res) => {
      const data = res?.data?.data;
      setOrderDetail(data);
      setProductOrderDetail(data?.products);
    });
  };

  useEffect(() => {
    getOrderDetail();
  }, []);

  const data1 = [];

  for (let i = 0; i < productOrderDetail?.length; i++) {
    data1.push({
      key: i + 1,
      name: productOrderDetail[i].product.name,
      brand: productOrderDetail[i].product.brand.name,
      count: productOrderDetail[i].count,
      amount: productOrderDetail[i].price,
      color: productOrderDetail[i].color,
      date: new Date(productOrderDetail[i].product.createdAt).toLocaleString(),
      // action: (
      //   <>
      //     <Link to="/" className=" fs-3 text-danger">
      //       <BiEdit />
      //     </Link>
      //     <Link className="ms-3 fs-3 text-danger" to="/">
      //       <AiFillDelete />
      //     </Link>
      //   </>
      // ),
    });
  }

  const handleClickBtnReturn = () => {
    navigate("/admin/orders");
  };

  return (
    <div>
      <Box>
        <HeaderCommon
          title={"View order"}
          handleClickBtn={handleClickBtnReturn}
        />
      </Box>
      <div>
        <Table columns={columns} dataSource={data1} />
      </div>
    </div>
  );
};

export default ViewOrder;
