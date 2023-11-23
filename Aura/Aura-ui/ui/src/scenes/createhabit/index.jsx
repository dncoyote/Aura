import React, {useState } from 'react';
import { Box, Button, Snackbar, TextField } from "@mui/material";
import axios from 'axios';
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/Header";
import { useNavigate } from 'react-router-dom';

const CreateHabit = () => {
    const [openSnackbar, setOpenSnackbar] = useState(false);
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const navigate = useNavigate();

  const handleCreateHabitSubmit = async (values) => {
    try {
      const response = await axios.post(
        "http://localhost:8080/aura/habitude/api/v1/habittracker/sethabit",
        values
      );

      console.log("API Response:", response.data);

      // Show success Snackbar
      setOpenSnackbar(true);

      // Redirect to "/habits"
      setTimeout(() => {
        navigate("/habit");
      }, 2000);
    } catch (error) {
      console.error("API Error:", error);

      // Show error Snackbar
      setOpenSnackbar(true);

      // Handle error scenarios here
    }
  };

  return (
    <Box m="20px">
      <Header title="CREATE HABIT" subtitle="Create a New Habit" />

      <Formik
        onSubmit={handleCreateHabitSubmit}
        initialValues={initialValues}
        validationSchema={checkoutSchema}
      >
        {({
          values,
          errors,
          touched,
          handleBlur,
          handleChange,
          handleSubmit,
        }) => (
          <form onSubmit={handleSubmit}>
            <Box
              display="grid"
              gap="30px"
              gridTemplateColumns="repeat(4, minmax(0, 1fr))"
              sx={{
                "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
              }}
            >
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Habit"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.name}
                name="name"
                error={!!touched.name && !!errors.name}
                helperText={touched.name && errors.name}
                sx={{ gridColumn: "span 2" }}
              />
              {/* <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Last Name"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.lastName}
                name="lastName"
                error={!!touched.lastName && !!errors.lastName}
                helperText={touched.lastName && errors.lastName}
                sx={{ gridColumn: "span 2" }}
              /> */}
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Description"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.description}
                name="description"
                error={!!touched.description && !!errors.description}
                helperText={touched.description && errors.description}
                sx={{ gridColumn: "span 4" }}
              />
            </Box>
            <Box display="flex" justifyContent="end" mt="20px">
              <Button type="submit" color="secondary" variant="contained">
                Create Habit
              </Button>
            </Box>
          </form>
        )}
      </Formik>

      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={() => setOpenSnackbar(false)}
        message="Habit created"
      />

    </Box>
  );
};

const checkoutSchema = yup.object().shape({
  name: yup.string().required("required"),
  description: yup.string().required("description"),
});
const initialValues = {
  name: "",
  description: ""
};

export default CreateHabit;
