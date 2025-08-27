import React, { useState } from "react";
import {
  Box,
  Grid,
  Card,
  CardContent,
  Container,
  CardMedia,
  Typography,
  Button,
  CardActionArea,
  CardActions,
} from "@mui/material";

import { useSelector, useDispatch } from "react-redux";
import { addToFavourite } from "../Redux/RecipeActions";
import { Link } from "react-router-dom";
import Loader from "./Loader";
import Alert from "./Alert";
import SearchListAlert from "./SearchListAlert";

const Home = () => {
  const dispatch = useDispatch();
  const allRecipes = useSelector((state) => state.allRecipeData);
  const loading = useSelector((state) => state.loading);
  const favouriteRecipe = useSelector((state) => state.favouriteRecipe);
  const [showalert, setShowAlert] = useState(false);

  const handleAddClick = (recipe) => {
    const existingItem = favouriteRecipe.find(
      (value) => value.id === recipe.id
    );
    if (existingItem) setShowAlert(true);
    else dispatch(addToFavourite(recipe));
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <Box
          sx={{
            flexGrow: 1,
            m: { xs: 1, sm: 2, md: 3 },
            minHeight: "80vh",
            backgroundColor: "#f9f9f9",
            py: 4,
          }}
        >
          {allRecipes.length > 0 ? (
            <Grid container spacing={4} justifyContent="center">
              {allRecipes.map((value) => (
                <Grid item xs={12} sm={6} md={4} lg={3} key={value.id}>
                  <Card
                    sx={{
                      height: "100%",
                      display: "flex",
                      flexDirection: "column",
                      boxShadow: 3,
                      borderRadius: 3,
                      transition: "transform 0.2s",
                      "&:hover": {
                        transform: "scale(1.03)",
                        boxShadow: 6,
                      },
                    }}
                  >
                    <Link
                      to={`/RecipeInstruction/${value.id}`}
                      style={{ textDecoration: "none", color: "inherit" }}
                    >
                      <CardActionArea>
                        <CardMedia
                          sx={{
                            height: 180,
                            backgroundSize: "cover",
                            backgroundPosition: "center",
                          }}
                          image={value.image_url}
                        />
                        <CardContent>
                          <Typography
                            gutterBottom
                            variant="h6"
                            sx={{
                              overflow: "hidden",
                              textOverflow: "ellipsis",
                              whiteSpace: "nowrap",
                              fontWeight: 600,
                            }}
                          >
                            {value.title}
                          </Typography>
                          <Typography
                            variant="body2"
                            color="text.secondary"
                            sx={{ fontStyle: "italic" }}
                          >
                            {value.publisher}
                          </Typography>
                        </CardContent>
                      </CardActionArea>
                    </Link>
                    <CardActions sx={{ justifyContent: "flex-end", px: 2 }}>
                      <Button
                        variant="contained"
                        color="primary"
                        size="small"
                        sx={{ borderRadius: 2, textTransform: "none" }}
                        onClick={() => {
                          handleAddClick(value);
                        }}
                      >
                        Add Favorite
                      </Button>
                      <Alert open={showalert} setOpen={setShowAlert} />
                    </CardActions>
                  </Card>
                </Grid>
              ))}
            </Grid>
          ) : (
            <Container maxWidth="sm" sx={{ mt: 8 }}>
              <Typography variant="h4" align="center" color="text.secondary" sx={{ mb: 3 }}>
                Nothing to show, please search something!
              </Typography>
              <SearchListAlert />
            </Container>
          )}
        </Box>
      )}
    </>
  );
};

export default Home;
