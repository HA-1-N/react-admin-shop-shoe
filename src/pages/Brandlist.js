import React, { useEffect, useState } from "react";
import { Table } from "antd";
import { BiEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { resetState } from "../features/brand/brandSlice";
import CustomModal from "../components/CustomModal";
import { deleteBrandApi, filterBrandApi } from "../api/brand.api";
import { PAGE_SIZE } from "../constants/page.constants";
import { toast } from "react-toastify";
import { Box, Button, Pagination } from "@mui/material";
import FormSearchBrand from "./brand/FormSearchBrand";

const columns = [
  {
    title: "Code",
    dataIndex: "brandCode",
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

const Brandlist = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);
  const [brandId, setbrandId] = useState("");
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);
  const [brandDetail, setBrandDetail] = useState([]);
  const [brandItem, setBrandItem] = useState(null);

  const showModal = (item) => {
    setOpen(true);
    setbrandId(item?._id);
    setBrandItem(item);
  };

  const hideModal = () => {
    setOpen(false);
  };

  const getBrandDetail = async () => {
    const data = {
      brandCode: "",
      name: "",
    };
    const params = {
      page: page,
      limit: PAGE_SIZE,
    };
    filterBrandApi(data, params)
      .then((res) => {
        setBrandDetail(res?.data?.data);
        setTotalPage(res?.data?.pagination?.totalPages);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    dispatch(resetState());
    getBrandDetail();
  }, []);

  const data1 = [];
  for (let i = 0; i < brandDetail.length; i++) {
    data1.push({
      key: i + 1,
      brandCode: brandDetail[i].brandCode,
      name: brandDetail[i].name,
      action: (
        <>
          <Link
            to={`/admin/brand/${brandDetail[i].brandCode}`}
            className=" fs-3 text-danger"
          >
            <BiEdit />
          </Link>
          <button
            className="ms-3 fs-3 text-danger bg-transparent border-0"
            onClick={() => showModal(brandDetail[i])}
          >
            <AiFillDelete />
          </button>
        </>
      ),
    });
  }
  const deleteBrand = async (e) => {
    const data = {
      brandCode: brandItem?.brandCode,
    };
    deleteBrandApi(data)
      .then((res) => {
        if (res) {
          setOpen(false);
          setTimeout(() => {
            getBrandDetail();
          }, 100);
          toast.success("Delete brand successful");
        } else {
          toast.error("Error");
        }
      })
      .catch((err) => {
        toast.error(err);
      });
  };

  const handleClickBtnAddBrand = () => {
    navigate("/admin/brand");
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
        <h3 className="mb-4 title">Brands</h3>
        <Button
          sx={{ marginBottom: "1.5rem" }}
          onClick={handleClickBtnAddBrand}
        >
          Add brand
        </Button>
      </Box>
      <Box sx={{ marginBottom: "1rem" }}>
        <FormSearchBrand
          page={page}
          setBrandDetail={setBrandDetail}
          setTotalPage={setTotalPage}
        />
      </Box>

      <div>
        <Table pagination={false} columns={columns} dataSource={data1} />
        <Pagination page={page} count={totalPage} onChange={onChangePage} />
      </div>
      <CustomModal
        hideModal={hideModal}
        open={open}
        performAction={() => {
          deleteBrand(brandId);
        }}
        title="Are you sure you want to delete this brand?"
      />
    </div>
  );
};

export default Brandlist;
