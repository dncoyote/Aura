import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField, IconButton } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import Slide from '@mui/material/Slide';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });

const AddActivity = ({ habitId }) => {
    const [openDialog, setOpenDialog] = useState(false);
  
    const handleOpenDialog = () => {
      setOpenDialog(true);
    };
  
    const handleCloseDialog = () => {
      setOpenDialog(false);
    };
  
    const handleSave = async (selectedDate) => {
        try {
          // Call your API here
          const response = await axios.post('http://localhost:8080/aura/habitude/api/v1/activity', {
            habitId,
            date: selectedDate,
          });
      
          // Handle the API response as needed
          console.log('API response:', response.data);
      
          handleCloseDialog();
        } catch (error) {
          // Handle API error
          console.error('Error calling API:', error);
        }
      };
  
    return (
      <>
        <IconButton color="primary" onClick={handleOpenDialog}>
          <AddIcon />
        </IconButton>
        <Dialog open={openDialog} TransitionComponent={Transition}
        keepMounted onClose={handleCloseDialog}>
          <DialogTitle>Add Activity</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Select a date to add activity.
            </DialogContentText>
            <TextField
              label="Select Date"
              type="date"
              fullWidth
              InputLabelProps={{
                shrink: true,
              }}
              onChange={(e) => handleSave(e.target.value)}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialog} color="primary">
              Cancel
            </Button>
            <Button onClick={() => handleSave()} color="primary">
              Save
            </Button>
          </DialogActions>
        </Dialog>
      </>
    );
  };
  
  export default AddActivity;