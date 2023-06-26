import React, { useEffect, useState } from "react";
import { Table } from "antd";
import { BiEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {
  deleteAProductCategory,
  getCategories,
  resetState,
} from "../features/pcategory/pcategorySlice";
import CustomModal from "../components/CustomModal";
import { PAGE_SIZE } from "../constants/page.constants";
import { deleteCategoryApi, filterCategoryApi } from "../api/category.api";
import { toast } from "react-toastify";
import { Box, Button, Pagination } from "@mui/material";
import FormSearchCategory from "./category/FormSearchCategory";

const columns = [
  {
    title: "SNo",
    dataIndex: "key",
  },
  {
    title: "Name",
    dataIndex: "name",
    sorter: (a, b) => a.name.length - b.name.length,
  },

  {
    title: "Action",
    dataIndex: "action",
  },
];

const Categorylist = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);
  const [categoryId, setCategoryId] = useState("");
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);
  const [categoryDetail, setCategoryDetail] = useState([]);
  const [categoryItem, setCategoryItem] = useState(null);

  const showModal = (item) => {
    setOpen(true);
    setCategoryId(item?._id);
    setCategoryItem(item);
  };

  const hideModal = () => {
    setOpen(false);
  };

  const getCategoryDetail = async () => {
    const data = {
      categoryName: "",
    };
    const params = {
      page: page,
      limit: PAGE_SIZE,
    };
    filterCategoryApi(data, params)
      .then((res) => {
        setCategoryDetail(res?.data?.data);
        setTotalPage(res?.data?.pagination?.totalPages);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    dispatch(resetState());
    getCategoryDetail();
  }, []);

  const data1 = [];
  for (let i = 0; i < categoryDetail.length; i++) {
    data1.push({
      key: i + 1,
      name: categoryDetail[i].categoryName,
      action: (
        <>
          <Link
            to={`/admin/category/${categoryDetail[i]._id}`}
            className=" fs-3 text-danger"
            state={{ categoryName: categoryDetail[i]?.categoryName }}
          >
            <BiEdit />
          </Link>
          <button
            className="ms-3 fs-3 text-danger bg-transparent border-0"
            onClick={() => showModal(categoryDetail[i])}
          >
            <AiFillDelete />
          </button>
        </>
      ),
    });
  }
  const handleClickBtnAddCategory = () => {
    navigate("/admin/category");
  };

  const deleteCategory = (e) => {
    const data = {
      categoryName: categoryItem?.categoryName,
    };

    deleteCategoryApi(data)
      .then((res) => {
        if (res) {
          setOpen(false);
          setTimeout(() => {
            getCategoryDetail();
          }, 100);
          toast.success("Delete category successful");
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
        <h3 className="mb-4 title">Product Categories</h3>
        <Button
          sx={{ marginBottom: "1.5rem" }}
          onClick={handleClickBtnAddCategory}
        >
          Add category
        </Button>
      </Box>

      <Box sx={{ marginBottom: "1rem" }}>
        <FormSearchCategory
          page={page}
          setCategoryDetail={setCategoryDetail}
          setTotalPage={setTotalPage}
        />
      </Box>

      <div>
        <Table columns={columns} dataSource={data1} pagination={false} />
        <Pagination page={page} count={totalPage} onChange={onChangePage} />
      </div>
      <CustomModal
        hideModal={hideModal}
        open={open}
        performAction={() => {
          deleteCategory(categoryId);
        }}
        title="Are you sure you want to delete this Product Category?"
      />
    </div>
  );
};

export default Categorylist;
