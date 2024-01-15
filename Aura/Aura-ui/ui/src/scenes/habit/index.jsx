import React, { useEffect, useState } from 'react';
import { Box, Typography, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import AddActivity from "../../components/AddActivity";
import axios from 'axios';

const Habit = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [habits, setHabits] = useState([]);

  const columns = [
    {
      field: "serialNumber",
      headerName: "#",
      flex: 1,
      renderCell: (params) => {
        // Assuming that the row object has a unique identifier like habitId
        const rowId = params.row.habitId;
        // Find the index of the row in the array
        const rowIndex = habits.findIndex((habit) => habit.habitId === rowId);
        // Display the serial number starting from 1
        return rowIndex + 1;
      },
    },
    {
      field: "name",
      headerName: "Name",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "description",
      headerName: "Description",
      flex: 1,
    },
    {
      field: "action",
      headerName: "Action",
      flex: 1,
      renderCell: (params) => (
        <AddActivity habitId={params.row.habitId} />
      ),
    },
  ];

  useEffect(() => {
    const fetchHabits = async () => {
      try {
        const response = await axios.get('http://localhost:8080/aura/habitude/api/v1/habit');
        setHabits(response.data);
        console.info(response.data);
      } catch (error) {
        console.error('Error fetching habits:', error);
      }
    };

    fetchHabits();
  }, []);

  return (
    <Box m="20px">
      <Header title="Habit" subtitle="List Habits" />
      <Box
        m="40px 0 0 0"
        height="75vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .name-column--cell": {
            color: colors.greenAccent[300],
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: colors.blueAccent[700],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: colors.primary[400],
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            backgroundColor: colors.blueAccent[700],
          },
          "& .MuiCheckbox-root": {
            color: `${colors.greenAccent[200]} !important`,
          },
        }}
      >
        <DataGrid rows={habits} columns={columns} getRowId={(row) => row.habitId}/>
      </Box>
    </Box>
  );
};

export default Habit;
