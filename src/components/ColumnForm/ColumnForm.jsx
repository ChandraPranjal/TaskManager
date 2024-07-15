import React from "react";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

function ColumnForm({state,setState}) {
  return (
      <form>
        <TextField
          label="columnName"
          variant="outlined"
          fullWidth
          margin="normal"
        />
        <Button
          variant="contained"
          color="primary"
          type="submit"
          onClick={() => {
            const newState = [...state];
            newState[0].tasksData.push({
              id: `item-${new Date().getTime()}`,
              content: `item ${new Date().getTime()}`,
            });
            setState(newState);
          }}
        >
          Submit
        </Button>
      </form>
  );
}

export default ColumnForm;
