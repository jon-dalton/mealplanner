import {
  Button,
  Checkbox,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography
} from "@mui/material";
import { graphql } from "babel-plugin-relay/macro";
import { useLazyLoadQuery } from "react-relay";
import { useParams } from "react-router";
import { ShoppingListQuery } from "./__generated__/ShoppingListQuery.graphql";
import { Print } from "@mui/icons-material";

const shoppingListQuery = graphql`
  query ShoppingListQuery($rowId: BigInt!) {
    mealPlan(rowId: $rowId) {
      nameEn
      descriptionEn
      person {
        fullName
      }
      mealPlanEntries {
        nodes {
          meal {
            id
            nameEn
            ingredients {
              nodes {
                id
                name
                quantity
                unit
                productKeyword
                matchedProducts {
                  nodes {
                    id
                    nameEn
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`;

export const ShoppingList = () => {
  const params = useParams();
  const node = useLazyLoadQuery<ShoppingListQuery>(
    shoppingListQuery, 
    { rowId: params.id },
    { fetchPolicy: "store-or-network" }
  );
  const mealPlan = node.mealPlan;
  interface MealIngredient {
    meals: Set<string>;
    quantity: any[][];
    unit: string[][];
    matchedProducts: string[];
  }
  const mealsByIngredient: Map<string, MealIngredient> = new Map<string, MealIngredient>();
  const mealCounts = new Map<string, number>();

  mealPlan?.mealPlanEntries.nodes.forEach((mealPlanEntry) => {
    const mealName = mealPlanEntry.meal?.nameEn;

    if (mealName) {
      if (mealCounts.has(mealName)) {
          mealCounts.set(mealName, mealCounts.get(mealName)! + 1);
      } else {
          mealCounts.set(mealName, 1);
        }
    }
    if (mealPlanEntry.meal?.ingredients) {
      mealPlanEntry.meal.ingredients.nodes.forEach((ingredient) => {
        let ingredientName = ingredient.name;
        const productKeyword = ingredient.productKeyword;
        const mealName = mealPlanEntry.meal?.nameEn;
        const quantity = ingredient.quantity;
        const unit = ingredient.unit;
        const matchedProducts = ingredient.matchedProducts.nodes.map(product => product.nameEn);
        if (mealName) {
          if (ingredientName.toLowerCase() !== productKeyword.toLowerCase()){
            ingredientName = ingredientName + " | " + productKeyword;
          }

          if (mealsByIngredient.has(ingredientName)) {
            const existingIngredientDetails = mealsByIngredient.get(ingredientName)!;
                
            // Check if the meal already exists for this ingredient
            if (!existingIngredientDetails.meals.has(mealName)) {
              existingIngredientDetails.quantity.push(quantity); // Push quantity for the ingredient
              existingIngredientDetails.unit.push([unit]); // Push unit for the ingredient
              
            }
            // Add the meal to the set of meals for this ingredient
            existingIngredientDetails.meals.add(mealName);
                
            // Merge matched products with existing ones
            existingIngredientDetails.matchedProducts.push(
              ...matchedProducts.filter(
                (product) => !existingIngredientDetails.matchedProducts.includes(product)
              )  
            );
                
            mealsByIngredient.set(ingredientName, existingIngredientDetails);
          } else {
            mealsByIngredient.set(ingredientName, {
              meals: new Set([mealName]),
              quantity: [quantity],
              unit: [[unit]],
              matchedProducts,
            });
          }
        }
      });
    }
  });
  return (
    <>
      <Grid container spacing="5" sx={{ padding: "2rem" }}>
        <Grid xs={12}>
          <Typography variant="subtitle1" sx={{ mr: 5 }}>
            {mealPlan?.person && `Prepared for ${mealPlan.person.fullName}`}
          </Typography>
        </Grid>
        <Grid item xs={8}>
          <Typography variant="h4">
            Shopping List - {mealPlan?.nameEn} &nbsp;
            <Button
              onClick={() => {
                window.print();
              }}
            >
              <Print></Print>
            </Button>
          </Typography>
        </Grid>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell style={{ color: "#000" }}>Ingredient</TableCell>
                <TableCell style={{ color: "#000" }}>Associated Meal</TableCell>
                <TableCell style={{ color: "#000" }}>Quantity/Unit Per Meal</TableCell>
                <TableCell style={{ color: "#000" }}>Suggested Product</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {Array.from(mealsByIngredient.entries()).map(([ingredientName, ingredientDetails]) => (
                <TableRow key={ingredientName}>
                  <TableCell>
                    <Checkbox />
                    {ingredientName}
                  </TableCell>
                  <TableCell>
                    {Array.from(ingredientDetails.meals).map((meal, index) => (
                      <div key={index}>
                        <li>{meal} {mealCounts.has(meal) && mealCounts.get(meal)! > 1 && ` x${mealCounts.get(meal)}`}</li>
                      </div>
                    ))}
                  </TableCell>
                  <TableCell>
                    {ingredientDetails.quantity.map((mealQuantities, index) => (
                      <div key={index}>
                        <li>{mealQuantities} {ingredientDetails.unit[index]} 
                        {mealCounts.get(Array.from(ingredientDetails.meals)[index])! > 1 && ` x${mealCounts.get(Array.from(ingredientDetails.meals)[index])}`}</li>
                      </div>
                    ))}
                  </TableCell>
                  <TableCell>
                    {ingredientDetails.matchedProducts.length > 0 ? (
                      ingredientDetails.matchedProducts.map((product, index) => (
                        <div key={index}>
                          <li>{product}</li>
                        </div>
                      ))
                    ) : (
                      <p>N/A</p>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
    </>
  );
};