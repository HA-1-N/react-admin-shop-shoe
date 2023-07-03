import {
  Box,
  Button,
  Grid,
  Modal,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { Form, Formik } from "formik";
import React from "react";
import * as Yup from "yup";
import { updateStatusOrderApi } from "../api/order.api";
import Select from "react-select";
import { OrderStatusDetail } from "../common/OrderStatus";

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

const ModalUpdateStatusOrder = (props) => {
  const { open, onClose, id, getAllOrder } = props;

  const initialValues = {
    status: "",
  };

  const validationSchema = Yup.object({
    status: Yup.object().nullable().required("Status is required"),
  });

  const handleChangeStatus = (formik) => (e) => {
    formik.setFieldValue("status", e);
  };

  const handleOnSubmit = async (values, formikHelper) => {
    const data = {
      ...values,
      status: values?.status?.value,
    };
    updateStatusOrderApi(data, id)
      .then((res) => {
        if (res) {
          getAllOrder();
          onClose();
        }
      })
      .catch((err) => {
        console.log(err);
      });
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
          <Box>
            <Formik
              initialValues={initialValues}
              onSubmit={handleOnSubmit}
              validationSchema={validationSchema}
              validateOnBlur={false}
              validateOnChange={true}
              enableReinitialize={true}
            >
              {(formik) => (
                <Form noValidate autoComplete="off">
                  <Box>
                    <Grid container spacing={2}>
                      <Grid item xs={12} md={12} lg={12}>
                        <Typography> Brand code</Typography>
                        <Select
                          className="basic-single"
                          classNamePrefix="select"
                          fullWidth
                          isClearable={true}
                          name="status"
                          id="status"
                          type="text"
                          placeholder="Select Status"
                          onBlur={formik.handleBlur}
                          onChange={handleChangeStatus(formik)}
                          value={formik.values.status}
                          options={OrderStatusDetail}
                        />
                        <div className="error">
                          {formik.touched.status && formik.errors.status}
                        </div>
                      </Grid>
                      <Grid item xs={12} md={12} lg={12}>
                        <Stack
                          direction={{ xs: "column", sm: "row" }}
                          spacing={2}
                          sx={{
                            mt: 2,
                            justifyContent: "end",
                          }}
                        >
                          <Button
                            type="button"
                            variant="outlined"
                            onClick={handleCancel}
                          >
                            Cancel
                          </Button>
                          <Button type="submit" variant="contained">
                            Submit
                          </Button>
                        </Stack>
                      </Grid>
                    </Grid>
                  </Box>
                </Form>
              )}
            </Formik>
          </Box>
        </Box>
      </Modal>
    </>
  );
};

export default ModalUpdateStatusOrder;
