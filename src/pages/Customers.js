import React, { useEffect, useState } from "react";
import { Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { getUsers } from "../features/cutomers/customerSlice";
import { useNavigate } from "react-router-dom";
import { PAGE_SIZE } from "../constants/page.constants";
import { filterUserApi } from "../api/user.api";
import { Pagination } from "@mui/material";
const columns = [
  {
    title: "ID",
    dataIndex: "id",
  },
  {
    title: "User name",
    dataIndex: "name",
    sorter: (a, b) => a.name.length - b.name.length,
  },
  {
    title: "Email",
    dataIndex: "email",
  },
  {
    title: "age",
    dataIndex: "age",
  },
];

const Customers = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);
  const [userDetail, setUserDetail] = useState([]);

  const getUserDetail = async () => {
    const data = {
      keyword: "",
    };
    const params = {
      page: page,
      limit: PAGE_SIZE,
    };

    filterUserApi(data, params)
      .then((res) => {
        setUserDetail(res?.data?.users);
        setTotalPage(res?.data?.totalPage);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    // dispatch(getUsers());
    getUserDetail();
  }, [page]);

  const onChangePage = (e, pageNumber) => {
    setPage(pageNumber);
  };

  const data1 = [];
  for (let i = 0; i < userDetail.length; i++) {
    if (userDetail[i].isAdmin !== true) {
      data1.push({
        id: userDetail[i].id,
        // name: customerstate[i].firstname + " " + customerstate[i].lastname,
        name: userDetail[i].name,
        email: userDetail[i].email,
        age: userDetail[i].age,
      });
    }
  }

  return (
    <div>
      <h3 className="mb-4 title">Customers</h3>
      <div>
        <Table pagination={false} columns={columns} dataSource={data1} />
        <Pagination page={page} count={totalPage} onChange={onChangePage} />
      </div>
    </div>
  );
};

export default Customers;
