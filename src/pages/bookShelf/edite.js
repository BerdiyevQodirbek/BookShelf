import * as React from "react";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import { Modal } from "@mui/base";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { Context } from "../../App";
import { updateBook } from "../../api/books";
import { statuses } from "../../constants";

function EditBook({ id, status, refetch, setEditeData }) {
  const [bookStatus, setBookStatus] = React.useState(status);
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

  const [user, setUser] = React.useContext(Context);

  const onFinish = async (event) => {
    event.preventDefault();

    if (bookStatus) {
      const res = await updateBook({
        key: user,
        id: id,
        status: JSON.stringify({ status: bookStatus }),
      });
      if (res?.data) {
        setEditeData(null);
        refetch();
      }
    }
  };

  return (
    <div>
      <Modal
        open={id}
        onClose={() => setEditeData(null)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Box component="form" noValidate onSubmit={onFinish} sx={{ mt: 3 }}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Status</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={bookStatus}
                label="Age"
                onChange={(e) => setBookStatus(e.target.value)}
              >
                {statuses?.map((item, i) => (
                  <MenuItem value={i}>{item}</MenuItem>
                ))}
              </Select>
            </FormControl>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <Button
                  onClick={() => setEditeData(null)}
                  fullWidth
                  variant="contained"
                  color="error"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Cancel
                </Button>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Edit Book
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}

export default EditBook;
