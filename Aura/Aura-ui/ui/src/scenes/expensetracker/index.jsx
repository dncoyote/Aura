import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { format } from 'date-fns';
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { Box, CircularProgress, Typography } from '@mui/material';
import { tokens } from "../../theme";
import Header from "../../components/Header";
import { useTheme } from "@mui/material";
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Divider from '@mui/material/Divider';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import PaidIcon from '@mui/icons-material/Paid';

const ExpenseTracker = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [expenses, setExpenses] = useState([]);
  const [monthlyStatement, setMonthlyStatement] = useState([]);
  const [salaryAmount, setSalaryAmount] = useState([]);
  const [creditAmount, setCreditAmount] = useState([]);
  const [debitAmount, setDebitAmount] = useState([]);
  const [remainingAmount, setRemainingAmount] = useState([]);
  const [showTables, setShowTables] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedMonth, setSelectedMonth] = useState(new Date().toLocaleString('default', { month: 'long' }));
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [selectedRows, setSelectedRows] = useState([]);
  const [totalSelectedAmount, setTotalSelectedAmount] = useState(0);

  const handleMonthChange = (event) => {
    setSelectedMonth(event.target.value);
    setSalaryAmount(0);
  setCreditAmount(0);
  setDebitAmount(0);
  setRemainingAmount(0);
  };

  const handleYearChange = (event) => {
    setSelectedYear(event.target.value);
    setSalaryAmount(0);
  setCreditAmount(0);
  setDebitAmount(0);
  setRemainingAmount(0);
  };

const calculateTotalAmount = (selectedRows) => {
  let totalAmount = 0;
  for (const id of selectedRows) {
    const selectedRow = expenses.find((row) => row.id === id);
    if (selectedRow) {
      totalAmount += selectedRow.amount;
    }
  }
  return totalAmount;
};

  useEffect(() => {
    setIsLoading(true);
    loadExpenses(selectedMonth, selectedYear);
    setExpenses()
  }, [selectedMonth, selectedYear]);

  const loadExpenses = async (month, year) => {
    try {
      const result = await axios.get(`http://localhost:8080/aura/patchpocket/api/v1/monthlystatement?month=${month}&year=${year}`);
      if (Array.isArray(result.data.data)) {
        setExpenses(result.data.data[0].data);
        setMonthlyStatement(result.data.data);
        setSalaryAmount(result.data.data[0].salaryAmount);
        setDebitAmount(result.data.data[0].debitAmount);
        setCreditAmount(result.data.data[0].creditAmount);
        setRemainingAmount(result.data.data[0].remainingAmount);
        setShowTables(true);
      } else {
        console.error('Invalid API response:', result.data);
      }
    } catch (error) {
      if (error.response && error.response.status === 400) {
        setShowTables(false);
      } else {
        console.error('Error loading expenses:', error);
      }
      } finally {
        setIsLoading(false);
      }
    }

  const columns = [
    { field: "id", headerName: "ID", flex: 0.5 },
    {
      field: "category",
      headerName: "Category",
      flex: 1,
      cellClassName: "category-column--cell",
    },
    {
      field: "type",
      headerName: "Type",
      flex: 1,
      cellClassName: "type-column--cell",
      renderCell: (params) => {
      const type = params.row.type;

      let icon = null;
      let color = '';

      if (type === 'DEBIT') {
        icon = <ArrowUpwardIcon style={{ color: 'red' }} />;
      } else if (type === 'CREDIT') {
        icon = <ArrowDownwardIcon style={{ color: 'green' }} />;
      } else if (type === 'SALARY') {
        icon = <PaidIcon style={{ color: 'blue' }} />;
      }

      return (
        <div style={{ display: 'flex', alignItems: 'center' }}>
         
          <span>{type}</span>&nbsp;{icon}
        </div>
      );
    },
    },
    {
      field: "amount",
      headerName: "Amount",
      type: "number",
      headerAlign: "left",
      align: "left",
      // valueGetter: (params) => {
      //   const amount = params.row.amount;
      //   return `₹ ${amount}`;
      // }
    },
    {
      field: "description",
      headerName: "Description",
      flex: 1,
    },
    {
      field: "date",
      headerName: "Date",
      flex: 1,
     valueGetter: (params) => {
      const date = params.row.date;
      return format(new Date(date), 'dd-MMMM-yyyy');
    },
  },
];

  return (
    <Box m="20px">
      <Header title="EXPENSE TRACKER" subtitle={`Expense Tracker: ${selectedMonth}, ${selectedYear}`}  />
      <div style={{ display: 'flex',  flexWrap: 'wrap', gap: '5px' }}>
       <FormControl required sx={{ minWidth: 275, width: '100%', maxWidth: 275 }}>
  <InputLabel id="month-select-label">Month</InputLabel>
  <Select
    labelId="month-select-label"
    id="month-select"
    value={selectedMonth}
    label="Month"
    onChange={handleMonthChange}
  >
    <MenuItem value={"January"}>January</MenuItem>
    <MenuItem value={"February"}>February</MenuItem>
    <MenuItem value={"March"}>March</MenuItem>
    <MenuItem value={"April"}>April</MenuItem>
    <MenuItem value={"May"}>May</MenuItem>
    <MenuItem value={"June"}>June</MenuItem>
    <MenuItem value={"July"}>July</MenuItem>
    <MenuItem value={"August"}>August</MenuItem>
    <MenuItem value={"September"}>September</MenuItem>
    <MenuItem value={"October"}>October</MenuItem>
    <MenuItem value={"November"}>November</MenuItem>
    <MenuItem value={"December"}>December</MenuItem>
  </Select>
</FormControl>
 <FormControl required sx={{ minWidth: 275, width: '100%', maxWidth: 275 }}>
  <InputLabel id="year-select-label">Year</InputLabel>
  <Select
    labelId="year-select-label"
    id="year-select"
    value={selectedYear}
    label="Year"
    onChange={handleYearChange}
  >
    <MenuItem value={"2022"}>2022</MenuItem>
    <MenuItem value={"2023"}>2023</MenuItem>
    <MenuItem value={"2024"}>2024</MenuItem>
  </Select>
</FormControl>
</div>
       <div style={{ paddingTop: '10px', display: 'flex',  flexWrap: 'wrap', gap: '5px' }}>
       
      <Card sx={{ minWidth: 275, width: '100%', maxWidth: 275 }}>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          Monthly Statement
        </Typography>
        <ListItem>
        <ListItemAvatar>
          <Avatar>
            <CurrencyRupeeIcon />
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary={"₹ " + salaryAmount} secondary="Salary" />
      </ListItem>
      <Divider variant="middle" />
         <ListItem>
        <ListItemAvatar>
          <Avatar>
            <ArrowDownwardIcon />
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary={"₹ " + creditAmount} secondary="Credit" />
      </ListItem>
       <Divider variant="middle" />
      <ListItem>
        <ListItemAvatar>
          <Avatar>
            <ArrowUpwardIcon />
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary={"₹ " + debitAmount} secondary="Debit" />
      </ListItem>
      <Divider variant="middle" />
      <ListItem>
        <ListItemAvatar>
          <Avatar>
            <AccountBalanceIcon />
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary={"₹ " + remainingAmount} secondary="Balance" />
      </ListItem>
      </CardContent>
    </Card>
    <Card sx={{ minWidth: 275, width: '100%', maxWidth: 275 }}>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          Top Spending
        </Typography>
         <ListItem>
        <ListItemAvatar>
          <Avatar>
            <ArrowDownwardIcon />
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary={"₹ " + 10000} secondary="Credit" />
      </ListItem>
      <Divider variant="middle" />
      <ListItem>
        <ListItemAvatar>
          <Avatar>
            <ArrowUpwardIcon />
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary={"₹ " + 10000} secondary="Debit" />
      </ListItem>
      <Divider variant="middle" />
      <ListItem>
        <ListItemAvatar>
          <Avatar>
            <CurrencyRupeeIcon />
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary={"₹ " + 10000} secondary="Balance" />
      </ListItem>
      </CardContent>
    </Card>
    <Card sx={{ minWidth: 275, width: '100%', maxWidth: 275 }}>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          Comparing to last month
        </Typography>
         <ListItem>
        <ListItemAvatar>
          <Avatar>
            <ArrowDownwardIcon />
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary={"₹ " + 10000} secondary="Credit" />
      </ListItem>
      <Divider variant="middle" />
      <ListItem>
        <ListItemAvatar>
          <Avatar>
            <ArrowUpwardIcon />
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary={"₹ " + 10000} secondary="Debit" />
      </ListItem>
      <Divider variant="middle" />
      <ListItem>
        <ListItemAvatar>
          <Avatar>
            <CurrencyRupeeIcon />
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary={"₹ " + 10000} secondary="Balance" />
      </ListItem>
      </CardContent>
    </Card>
    <Card sx={{ minWidth: 275, width: '100%', maxWidth: 275 }}>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          Comparing to last month
        </Typography>
         <ListItem>
        <ListItemAvatar>
          <Avatar>
            <ArrowDownwardIcon />
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary={"₹ " + 10000} secondary="Credit" />
      </ListItem>
      <Divider variant="middle" />
      <ListItem>
        <ListItemAvatar>
          <Avatar>
            <ArrowUpwardIcon />
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary={"₹ " + 10000} secondary="Debit" />
      </ListItem>
      <Divider variant="middle" />
      <ListItem>
        <ListItemAvatar>
          <Avatar>
            <CurrencyRupeeIcon />
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary={"₹ " + 10000} secondary="Balance" />
      </ListItem>
      </CardContent>
    </Card>
    <Card sx={{ minWidth: 275, width: '100%', maxWidth: 275 }}>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          Comparing to last month
        </Typography>
         <ListItem>
        <ListItemAvatar>
          <Avatar>
            <ArrowDownwardIcon />
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary={"₹ " + 10000} secondary="Credit" />
      </ListItem>
      <Divider variant="middle" />
      <ListItem>
        <ListItemAvatar>
          <Avatar>
            <ArrowUpwardIcon />
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary={"₹ " + 10000} secondary="Debit" />
      </ListItem>
      <Divider variant="middle" />
      <ListItem>
        <ListItemAvatar>
          <Avatar>
            <CurrencyRupeeIcon />
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary={"₹ " + 10000} secondary="Balance" />
      </ListItem>
      </CardContent>
    </Card>
    </div>
     
        {isLoading ? (
          <Box display="flex" justifyContent="center" alignItems="center" height="100%">
            <CircularProgress />
          </Box>
        ) : showTables ? (
         <><Box
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
          "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
            color: `${colors.grey[100]} !important`,
          },
        }}
       
      >   <Typography variant="h6">SUM: ₹{totalSelectedAmount}</Typography>
      <DataGrid checkboxSelection rows={expenses} columns={columns} components={{ Toolbar: GridToolbar }}
  onSelectionModelChange={(selectionModel) => {
    setSelectedRows(selectionModel);
    const totalAmount = calculateTotalAmount(selectionModel);
    setTotalSelectedAmount(totalAmount);}}/></Box></>
        ) : (
          <Alert severity="info">
  <AlertTitle>Info</AlertTitle>
  No data available for <strong>{selectedMonth}, {selectedYear}</strong>
</Alert>
        )}
    </Box>
  );
  };


export default ExpenseTracker;
