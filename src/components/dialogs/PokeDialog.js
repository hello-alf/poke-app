import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

import React from "react";
import { Formik } from "formik";

const PokeSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, "El nombre del pokemon no debe tener menos de 2 caracteres")
    .max(100, "El nombre pokemon no debe tener más de 100 caracteres")
    .required("El nombre pokemon es requerido"),
});

export default function PokeDialog({ handleClose, open }) {
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      PaperProps={{
        component: "form",
        onSubmit: (event) => {
          event.preventDefault();
          const formData = new FormData(event.currentTarget);
          const formJson = Object.fromEntries(formData.entries());
          const email = formJson.email;
          console.log(email);
          handleClose();
        },
      }}
    >
      <DialogTitle>Nuevo Pokemon</DialogTitle>

      <Formik
        initialValues={{
          name: "",
          deviceDoorForm: "",
          descriptionDoorForm: "",
        }}
        validationSchema={PokeSchema}
        onSubmit={(data, { setSubmitting }) => handleSubmit()}
      >
        {({ isSubmitting, handleChange, setFieldValue, values }) => (
          <>
            <DialogContent>
              <TextField
                autoFocus
                required
                margin="dense"
                id="name"
                name="email"
                label="Email Address"
                type="email"
                fullWidth
                variant="standard"
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose}>Cancel</Button>
              <Button type="submit">Subscribe</Button>
            </DialogActions>
          </>
        )}
      </Formik>
    </Dialog>
  );
}
