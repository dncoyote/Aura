import React, { useEffect, useState } from 'react';
import { Box, Typography, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import ActivityCalendar from "react-activity-calendar";
import GitHubCalendar from 'react-github-calendar';
import axios from 'axios';
import { Tooltip as MuiTooltip } from '@mui/material';

const Activity = () => {
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

  const [habitData, setActivityData] = useState([]);
  useEffect(() => {
    const fetchActivityData = async () => {
      try {
        const response = await axios.get('http://localhost:8080/aura/habitude/api/v1/activities');
        setActivityData(response.data);
        console.info(response.data);
      } catch (error) {
        console.error('Error fetching habit data:', error);
      }
    };
    fetchActivityData();
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
<GitHubCalendar username="dncoyote" weekStart={1} year='2023' theme={explicitTheme} renderBlock={(block, activity) => (
    <MuiTooltip
      title={`${activity.count} activities on ${activity.date}`}
    >
      {block}
    </MuiTooltip>)}/>
    {habitData.map((habit) => (
          <div key={habit.habitId}>
            <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
              {habit.habitName}
            </Typography>
            <ActivityCalendar
              weekStart={1}
              data={habit.activities}
              labels={{
                legend: {
                  less: "Less",
                  more: "More"
                },
                months: [
                  "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
                ],
                totalCount: "{{count}} times in {{year}}",
                weekdays: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
              }}
              theme={explicitTheme}
              renderBlock={(block, activity) => (
                <MuiTooltip
                  title={`${activity.count} activities on ${activity.date}`}
                >
                  {block}
                </MuiTooltip>
              )}
            />
          </div>
        ))}
      </Box>
    </Box>
  );
};

export default Activity;
