import React, { useEffect, useState } from "react";
import { Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { BsClipboard } from "react-icons/bs";
import { AiFillDelete } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import { getOrders } from "../features/auth/authSlice";
import { getAllOrderApi } from "../api/order.api";
const columns = [
  {
    title: "SNo",
    dataIndex: "key",
  },
  {
    title: "User name",
    dataIndex: "name",
  },
  {
    title: "Email",
    dataIndex: "email",
  },
  // {
  //   title: "Product",
  //   dataIndex: "product",
  // },
  {
    title: "Amount",
    dataIndex: "amount",
  },
  {
    title: "Date",
    dataIndex: "date",
  },
  { title: "Status", dataIndex: "status" },
  {
    title: "Action",
    dataIndex: "action",
  },
];

const Orders = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [allOrderDetail, setAllOrderDetail] = useState([]);
  const getAllOrder = () => {
    getAllOrderApi().then((res) => {
      const data = res?.data?.data;
      setAllOrderDetail(data);
    });
  };

  useEffect(() => {
    getAllOrder();
  }, []);

  const data1 = [];
  for (let i = 0; i < allOrderDetail?.length; i++) {
    data1.push({
      key: i + 1,
      name: allOrderDetail[i].orderby.userName,
      email: allOrderDetail[i].orderby.email,
      // product: (
      //   <Link to={`/admin/order/${allOrderDetail[i].orderby._id}`}>
      //     View Orders
      //   </Link>
      // ),
      amount: allOrderDetail[i].paymentIntent.amount,
      date: new Date(allOrderDetail[i].createdAt).toLocaleString(),
      status: allOrderDetail[i].orderStatus,
      action: (
        <>
          <Link
            to={`/admin/order/${allOrderDetail[i]._id}`}
            className=" fs-3 text-danger"
          >
            <BsClipboard />
          </Link>
        </>
      ),
    });
  }
  return (
    <div>
      <h3 className="mb-4 title">Orders</h3>
      <div>{<Table columns={columns} dataSource={data1} />}</div>
    </div>
  );
};

export default Orders;
