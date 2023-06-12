import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { removeUserKey } from "../../utils";
import { Context } from "../../App";
import { deleteBook, getBooks } from "../../api/books";
import EditBook from "./edite";
import AddBook from "./add";
import { statusColors, statuses } from "../../constants";

const defaultTheme = createTheme();

export default function BookShelf() {
  const [booksData, setBooksData] = React.useState([]);
  const [editeData, setEditeData] = React.useState(null);
  const [user, setUser] = React.useContext(Context);

  async function request() {
    const res = await getBooks({ key: user });
    if (res?.data) {
      setBooksData(res?.data);
    }
  }

  async function deleteHandler(id) {
    const res = await deleteBook({ key: user, id });
    if (res.isOk) {
      request();
    }
  }

  React.useEffect(() => {
    request();
  }, []);

  return (
    <ThemeProvider theme={defaultTheme}>
      <AppBar position="relative">
        <Toolbar>
          <Grid
            container
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <Button
              onClick={() => {
                setUser(null);
                removeUserKey();
              }}
              variant="contained"
              color="error"
            >
              Log out
            </Button>
            <AddBook refetch={() => request()} />
          </Grid>
        </Toolbar>
      </AppBar>
      <main>
        <Box
          sx={{
            bgcolor: "background.paper",
            pt: 8,
            pb: 2,
          }}
        >
          <Container maxWidth="sm">
            <Typography
              component="h1"
              variant="h2"
              align="center"
              color="text.primary"
              gutterBottom
            >
              Books
            </Typography>
            <Typography
              variant="h5"
              align="center"
              color="text.secondary"
              paragraph
            >
              You can add a new book to shelf, edit status of the book or delete
              books from shelf. Have fun : )
            </Typography>
          </Container>
        </Box>
        <Container sx={{ py: 2 }} maxWidth="lg">
          <Grid container spacing={4}>
            {booksData?.map(({ book, status }) => (
              <Grid item key={book} xs={12} sm={6} md={3}>
                <Card
                  sx={{
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <CardMedia
                    component="div"
                    sx={{
                      pt: "56.25%",
                    }}
                    image="https://source.unsplash.com/random?wallpapers"
                  />
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography gutterBottom variant="h5" component="h2">
                      {book?.title ?? "Untitled"}
                    </Typography>
                    <Grid
                      container
                      spacing={2}
                      justifyContent={"space-between"}
                    >
                      <Grid item xs={12} sm={6}>
                        <Typography>Author:</Typography>
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <Typography textAlign={"end"}>
                          {book?.author ?? "__"}
                        </Typography>
                      </Grid>
                    </Grid>
                    <Grid
                      container
                      spacing={2}
                      justifyContent={"space-between"}
                    >
                      <Grid item xs={12} sm={6}>
                        <Typography>Published:</Typography>
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <Typography textAlign={"end"}>
                          {book?.published ?? "__"}
                        </Typography>
                      </Grid>
                    </Grid>
                    <Grid
                      container
                      spacing={2}
                      justifyContent={"space-between"}
                    >
                      <Grid item xs={12} sm={6}>
                        <Typography>Pages:</Typography>
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <Typography textAlign={"end"}>
                          {book?.pages ?? "__"}
                        </Typography>
                      </Grid>
                    </Grid>
                    <Grid
                      container
                      spacing={2}
                      justifyContent={"space-between"}
                    >
                      <Grid item xs={12} sm={6}>
                        <Typography>Status:</Typography>
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <Typography
                          color={statusColors[status]}
                          textAlign={"end"}
                        >
                          {statuses?.[status] ?? "__"}
                        </Typography>
                      </Grid>
                    </Grid>
                  </CardContent>
                  <CardActions>
                    <Button
                      onClick={() => setEditeData({ id: book?.id, status })}
                      size="small"
                      color="warning"
                    >
                      Edit
                    </Button>
                    <Button
                      onClick={() => deleteHandler(book?.id)}
                      size="small"
                      color="error"
                    >
                      Delete
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </main>
      {editeData?.id && (
        <EditBook
          id={editeData?.id}
          status={editeData?.status}
          setEditeData={(e) => setEditeData(e)}
          refetch={request}
        />
      )}
    </ThemeProvider>
  );
}
