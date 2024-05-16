import { ArrowBack, Print } from "@mui/icons-material";
import {
  Container,
  Grid,
  IconButton,
  Paper,
  Rating,
  Tooltip,
  Typography,
  useTheme,
} from "@mui/material";
import { Box } from "@mui/system";
import { graphql } from "babel-plugin-relay/macro";
import React from "react";
import { useLazyLoadQuery } from "react-relay";
import { useParams } from "react-router";
import { MealQuery } from "./__generated__/MealQuery.graphql";

const mealQuery = graphql`
  query MealQuery($mealId: BigInt!) {
    meal(rowId: $mealId) {
      rowId
      code
      nameEn
      nameFr
      tags
      descriptionEn
      descriptionFr
      categories
      photoUrl
      videoUrl
      method
      totalCost
      servingCost
      tips
      servingsSize
      servingsSizeUnit
      prepTime
      cookTime
      portions
      nutritionRating
      nutrition {
        calcium
        calories
        carbohydrate
        carbohydratePercent
        carbohydrateUnit
        cholesterol
        cholesterolPercent
        cholesterolUnit
        dietaryFiber
        dietaryFiberPercent
        dietaryFiberUnit
        iron
        potassium
        protein
        proteinPercent
        proteinUnit
        saturatedFat
        saturatedFatPercent
        saturatedFatUnit
        servingSize
        servingSizeText
        servingSizeUnit
        servingsPerContainer
        sodium
        sodiumPercent
        sodiumUnit
        totalFatPercent
        totalFat
        totalFatUnit
        totalSugar
        totalSugarPercent
        totalSugarUnit
        transFat
        transFatPercent
        transFatUnit
        vitA
        vitB12
        vitB6
        vitC
        vitD
        vitE
        vitK
      }
      ingredients {
        edges {
          node {
            name
            rowId
            quantity
            unit
            substituteReason
            substituteIngredientId
            substituteIngredient {
              rowId
            }
          }
        }
      }
    }
  }
`;

export const Meal = () => {
  const params = useParams();
  const node = useLazyLoadQuery<MealQuery>(
    mealQuery,
    { mealId: params.id },
    { fetchPolicy: "store-or-network" }
  );
  const meal = node.meal;
  const data = node.meal?.nutrition;
  const nutritionData = data
    ? Object.entries(data) .filter(([key, value]) => value !== null) .map(([key, value]) => ( <React.Fragment> {key}: {value} <br /> </React.Fragment>))
    : "No data";

  const allIngredients = meal?.ingredients?.edges.map((ingredient) => ingredient.node);
  const theme = useTheme();
  const tagStyle = {
    color: "white",
    backgroundColor: `${theme.palette.primary.dark}`,
    padding: "0 0.5em",
    borderRadius: "1em",
    margin: "0.3em 0",
    display: "inline-block",
  };

  const displayCost = () => {
    return meal?.totalCost > 0 ? meal?.totalCost + "$" : "Not available";
  };

  const customValue = () => {
    window.print()
  }


  const bottomelement = `
    @media print{
      #bottomelement{
        display: block !important;
      }
    }
  
  `;

  const newStyle = document.createElement('style');
  newStyle.textContent = bottomelement;
  document.head.appendChild(newStyle);


  const displayTags = () => {
    return meal!.tags?.map((tag) => (
      <span>
        <span style={tagStyle}>{tag}</span>
        &nbsp;
        {/* For the space between tags */}
      </span>
    ));
  };
  return (
    <>
      <Box
        sx={{
          displayPrint: "none",
          width: "100%",
          height: "300px",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundImage: `url(${meal?.photoUrl || "/images/Logo_Meal.png"})`,
        }}
      >
        <IconButton
          onClick={() => window.history.back()}
          color="inherit"
          sx={{ top: 30, left: 50, bgcolor: "white", opacity: "0.9" }}
        >
          <ArrowBack />
        </IconButton>
        <Paper
          sx={{
            textAlign: "center",
            width: "160px",
            opacity: "0.7",
            position: "absolute",
            right: 50,
            top: 150,
            backgroundColor: "black",
          }}
        >
          <Typography variant="caption" color="whitesmoke">
            Estimated price
          </Typography>
          <Typography variant="h5" color="whitesmoke">
            {displayCost()}
          </Typography>
        </Paper>
        <Tooltip title={nutritionData}>
          <Paper
            sx={{
              textAlign: "center",
              width: "160px",
              opacity: "0.7",
              position: "absolute",
              right: 50,
              top: 250,
              backgroundColor: "black",
            }}
          >
            <Typography variant="caption" color="whitesmoke">
              Nutrition rating
            </Typography>
            <Rating
              name="read-only"
              value={meal?.nutritionRating === undefined ? null : meal?.nutritionRating}
              readOnly
            />
          </Paper>
        </Tooltip>
        <Typography variant="body1" lineHeight="2rem" position="absolute" top="300px" left="50px">
          {displayTags()}
        </Typography>
      </Box>
      <Container maxWidth="lg" sx={{ marginTop: "1em" }}>
        <Grid container spacing={2} rowSpacing={4} marginTop={1}>
          <Grid
            item
            xs={3}
            
            sx={{ textAlign: "center", displayPrint: "none" }}
            bgcolor={theme.palette.grey[200]}
          >
            {meal?.videoUrl ? (
              //  Showing youtube video only if it exists
              <div className="video-responsive">
                <iframe
                  width="250px"
                  src={"https://youtube.com/embed/".concat(
                    meal?.videoUrl.slice(meal?.videoUrl.search("=") + 1)
                  )}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  title="Embedded youtube"
                />
              </div>
            ) : (
              <img
                width="200px"
                src={meal?.photoUrl || "/images/Logo_Meal.png"}
                alt={meal?.nameEn}
              />
            )}
          </Grid>

          <Grid item xs={9} bgcolor={theme.palette.grey[200]} style={{position:'relative'}}  sx={{
          // Use CSS @media rule to set min-height based on print or not
          "@media print": {
            minHeight: "100vh"}}
          }>
            <Typography variant="h3">
              {meal?.nameEn}
              <IconButton
                onClick={customValue}
                sx={{ marginLeft: "1rem", displayPrint: "nabc123" }}
              >
                <Print htmlColor={`${theme.palette.primary.dark}`}></Print>
              </IconButton>
            </Typography>
            <div id="bottomelement" style={{position:'fixed',
                                    bottom:0,
                                    width:'100%',
                                    textAlign:'center',
                                    padding:'10px',
                                    display:'none'}}> 
            
            <Typography variant="body1" align="center">
            For Greener Village. By Civic Tech Fredericton.
            </Typography>
            <Typography variant="body2" align="center">
            If you run into issues or have any suggestions or questions, please
            feel free to post your{" "}
            <a
              href="https://www.civictechfredericton.com/gmpfeedback.html"
              target="_blank"
              rel="noreferrer"
            >
            {" "}
            feedback
            </a>
            </Typography>
            <Box display= "flex" alignItems= "center" justifyContent="center">
            <img src="/images/CivicTechLogo.png" alt="CivicTechLogo" style={{ width: '12%', height: 'auto', marginTop: '10px' }}/>
            </Box>
            </div>
            <Typography variant="h4">{meal?.nameFr}</Typography>
            <Typography variant="body1">
              {meal?.categories?.map((category) => (
                <span>
                  <span style={tagStyle}>{category}</span>
                  &nbsp;
                </span>
              ))}
            </Typography>
            <Typography variant="body1" sx={{ display: "none", displayPrint: "block" }}>
              {displayTags()}
            </Typography>
            <Typography variant="body1" sx={{ display: "none", displayPrint: "block" }}>
              Estimated Price: {displayCost()} Nutrition Rating: {meal?.nutritionRating}
            </Typography>
            <Typography variant="caption">
              Meal Code: {meal?.code} &nbsp; Prep Time: {meal?.prepTime} mins &nbsp; Cook Time:{" "}
              {meal?.cookTime} mins &nbsp; Portions: {meal?.portions} &nbsp; Serving Size:{" "}
              {meal?.servingsSize} {meal?.servingsSizeUnit} &nbsp; Serving Cost: {meal?.servingCost}
              $
            </Typography>

            {/* Explicitly indicate meal description is not available*/}
            {meal?.descriptionEn ? (
              <Typography paddingTop="1em">
                <b>Description: </b>
                {meal.descriptionEn}{" "}
              </Typography>
            ) : (
              <Typography color="gray">No meal description available</Typography>
            )}
            <Typography paddingBottom="1em">{meal?.descriptionFr}</Typography>
          </Grid>
          <Grid item xs={3}>
            <Typography
              variant="body1"
              sx={{
                "#ingredientsTable tbody tr:nth-of-type(even)": {
                  backgroundColor: `${theme.palette.info.light}` 
                },
                "#ingredientsTable": {
                  border: `1px solid ${theme.palette.info.dark}`,
                  padding: "0.3em",
                },
                "#ingredientsTable td": {
                  verticalAlign: "top",
                },
                "#ingredientsTable span": {
                  fontStyle: "italic",
                },
              }}
            >
              <>
                <table id="ingredientsTable" cellSpacing="0" cellPadding="0">
                  <thead>
                    <tr style={{ backgroundColor: `${theme.palette.info.light}` }}>
                      <th style={{ textAlign: "left" }}>Ingredients</th>
                      <th style={{ textAlign: "center" }}>Qtt</th>
                      <th style={{ textAlign: "center" }}>Unit</th>
                    </tr>
                  </thead>
                  <tbody>
                    {allIngredients?.map((ingredient) => {
                      return (
                        <tr key={ingredient.rowId}>
                          <td>
                            {ingredient.substituteIngredientId === null && ingredient.name}
                            {ingredient.substituteIngredientId && (
                              <>
                                <span style={{ fontStyle: "italic", marginLeft: "0.5rem" }}>
                                  Substitute: {ingredient?.name}
                                </span>
                                <br />
                                <span style={{ fontStyle: "italic", marginLeft: "0.5rem" }}>
                                  Reason:
                                  {ingredient.substituteReason
                                    ? ingredient.substituteReason
                                    : "Not specified"}
                                </span>
                              </>
                            )}
                          </td>
                          <td style={{ textAlign: "center", verticalAlign: "top" }}>
                            {ingredient.substituteIngredientId === null && ingredient.quantity}
                            {/* {ingredient.quantity} */}
                            {ingredient.substituteIngredient && (
                              <>
                                <span>{ingredient.quantity}</span>
                                <br />
                              </>
                            )}
                          </td>
                          <td style={{ paddingLeft: "0.5rem" }}>
                            {ingredient.substituteIngredientId === null && ingredient.unit}
                            {/* {ingredient.unit} */}
                            {ingredient.substituteIngredient && (
                              <>
                                <span>{ingredient.unit}</span>
                                <br />
                              </>
                            )}
                          </td>
                          <td></td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </>
            </Typography>
          </Grid>
          <Grid item xs={9}>
            <Typography variant="h6"> Method of preparation </Typography>
            <Typography>
              <div
                dangerouslySetInnerHTML={{
                  __html: meal?.method || "no method description",
                }}
              />
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h6">Tips</Typography>
            <Typography variant="body1"> {meal?.tips}</Typography>
            Nutrition Details is available with the admin.
          </Grid>
        </Grid>
      </Container>
    </>
  );
};
