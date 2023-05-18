import { Box, Button, Typography } from "@mui/material";
import React from "react";
import KeyboardDoubleArrowLeftIcon from "@mui/icons-material/KeyboardDoubleArrowLeft";
import { useNavigate } from "react-router-dom";
import HeaderCommon from "../../components/HeaderCommon";

const HeaderUpdateProduct = () => {
  const navigate = useNavigate();

  const handleClickBtn = () => {
    navigate("/admin/list-product");
  };

  return (
    <>
      <Box>
        <HeaderCommon handleClickBtn={handleClickBtn} title={"Product"} />
      </Box>
    </>
  );
};

export default HeaderUpdateProduct;
