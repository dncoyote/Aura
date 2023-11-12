import React, { useEffect, useState } from 'react';
import { Box, Typography, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import ActivityCalendar from "react-activity-calendar";
import GitHubCalendar from 'react-github-calendar';
import axios from 'axios';

const Habit = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  
  const explicitTheme = {
    light: ['#384259','#f0f0f0', '#c4edde', '#7ac7c4', '#f73859'],
    dark: ['#383838', '#4D455D', '#7DB9B6', '#F5E9CF', '#E96479'],
  };
  const minimalTheme = {
    light: ['hsl(0, 0%, 92%)', 'rebeccapurple'],
    // for `dark` the default theme will be used
  };

  const [habitData, setHabitData] = useState([]);
  useEffect(() => {
    const fetchHabitData = async () => {
      try {
        const response = await axios.get('http://localhost:8080/aura/habitude/api/v1/habits');
        setHabitData(response.data);
        console.info(response.data);
      } catch (error) {
        console.error('Error fetching habit data:', error);
      }
    };
    fetchHabitData();
  }, []);

  return (
    <Box m="20px">
      <Header title="HABIT" subtitle="Tracker" />
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
        
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          Github
        </Typography>
<GitHubCalendar username="dncoyote" year='2023' theme={explicitTheme}/>
<Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
Reading
        </Typography>
        <ActivityCalendar year='2023'
        data={habitData}
        labels={{
        legend: {
          less: "Less",
          more: "More"
        },
        months: [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
          "Oct",
          "Nov",
          "Dec"
        ],
        totalCount: "{{count}} times in {{year}}",
        weekdays: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
      }}
      theme={explicitTheme}/>
      </Box>
    </Box>
  );
};

export default Habit;
