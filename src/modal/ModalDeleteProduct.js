import { Box, Button, Modal, Stack, Typography } from "@mui/material";
import React from "react";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const ModalDeleteProduct = (props) => {
  const { open, onClose, deleteProduct } = props;

  const handleOnSubmit = () => {
    deleteProduct();
    onClose();
  };

  const handleCancel = () => {
    onClose();
  };
  return (
    <>
      <Modal
        open={open}
        onClose={() => {}}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Confirm
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Do you confirm delete product?
          </Typography>
          <Stack
            direction={{ xs: "column", sm: "row" }}
            spacing={2}
            sx={{
              mt: 2,
              justifyContent: "end",
            }}
          >
            <Button type="button" variant="outlined" onClick={handleCancel}>
              Cancel
            </Button>
            <Button type="button" variant="contained" onClick={handleOnSubmit}>
              Submit
            </Button>
          </Stack>
        </Box>
      </Modal>
    </>
  );
};

export default ModalDeleteProduct;
