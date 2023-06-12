import * as React from "react";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { Modal } from "@mui/base";
import { TextField } from "@mui/material";
import { Context } from "../../App";
import { addBook } from "../../api/books";

function AddBook({ refetch }) {
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

  const [open, setOpen] = React.useState(false);
  const [isOpen, setIsOpen] = React.useState(false);
  const [message, setMessage] = React.useState("");
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const onFinish = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const title = data.get("title");
    const author = data.get("author");
    const published = data.get("published");
    const pages = data.get("pages");
    if (!pages) {
      setMessage("pages");
      setIsOpen(true);
    }
    if (!published) {
      setMessage("published");
      setIsOpen(true);
    }
    if (!author) {
      setMessage("author");
      setIsOpen(true);
    }
    if (!title) {
      setMessage("title");
      setIsOpen(true);
    }

    if (title && author && published && pages) {
      const res = await addBook({
        data: {
          title,
          author,
          published,
          pages,
          isbn: new Date().getTime() + title,
        },
        key: user,
      });
      if (res?.data) {
        handleClose();
        refetch();
      }
    }
  };

  return (
    <div>
      <Button variant="contained" color="success" onClick={handleOpen}>
        Add Book
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Box component="form" noValidate onSubmit={onFinish} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="title"
                  label="Title of the book"
                  name="title"
                  autoComplete="title"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="author"
                  label="Author"
                  type="author"
                  id="author"
                  autoComplete="author"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="published"
                  name="published"
                  required
                  fullWidth
                  id="published"
                  label="Published"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="pages"
                  label="Pages"
                  name="pages"
                  autoComplete="pages"
                />
              </Grid>
            </Grid>
            {isOpen ? (
              <Typography
                component="h6"
                variant="h6"
                align="center"
                color="red"
                gutterBottom
              >
                Please enter {message}
              </Typography>
            ) : (
              ""
            )}
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <Button
                  onClick={handleClose}
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
                  Add Book
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}

export default AddBook;
