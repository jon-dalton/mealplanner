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
                    price
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

  interface Meal {
    id: string;
    name: string;
  }

  interface Product {
    id: string;
    productName: string;
    price: any;
  }

  interface MealIngredient {
    mealsById: Meal[];
    quantity: any[];
    unit: string[];
    matchedProducts: Product[];
  }
  
  const mealsByIngredient: Map<string, MealIngredient> = new Map<string, MealIngredient>();
  const mealCounts = new Map<string, number>();

  mealPlan?.mealPlanEntries.nodes.forEach((mealPlanEntry) => {
    const mealId = mealPlanEntry.meal?.id;
    const mealName = mealPlanEntry.meal?.nameEn;

    if (mealId) {
      if (mealCounts.has(mealId)) {
          mealCounts.set(mealId, mealCounts.get(mealId)! + 1);
      } else {
          mealCounts.set(mealId, 1);
        }
    }
    if (mealPlanEntry.meal?.ingredients) {
      mealPlanEntry.meal.ingredients.nodes.forEach((ingredient) => {
        let ingredientName = ingredient.name.toLowerCase();
        const productKeyword = ingredient.productKeyword.toLowerCase();
        const quantity = ingredient.quantity;
        const unit = ingredient.unit;
        const matchedProducts = ingredient.matchedProducts.nodes.map(product => ({
          id: product.id,
          productName: product.nameEn, 
          price: product.price
        }));

        if (mealId && mealName) {
          if (ingredientName !== productKeyword){
            ingredientName = `${ingredientName} | ${productKeyword}`;
          }

          if (mealsByIngredient.has(ingredientName)) {
            const existingIngredientDetails = mealsByIngredient.get(ingredientName)!;
            const mealExists = existingIngredientDetails.mealsById.some(meal => meal.id === mealId);

            if (!mealExists) {
              existingIngredientDetails.mealsById.push({ id: mealId, name: mealName });
              existingIngredientDetails.quantity.push(quantity);
              existingIngredientDetails.unit.push(unit);
              
            }
            existingIngredientDetails.matchedProducts.push(
              ...matchedProducts.filter(
                (product) => !existingIngredientDetails.matchedProducts.some(p => p.id === product.id)
              )  
            );
            
                
            mealsByIngredient.set(ingredientName, existingIngredientDetails);
          } else {
            mealsByIngredient.set(ingredientName, {
              mealsById: [{ id: mealId, name: mealName }],
              quantity: [quantity],
              unit: [unit],
              matchedProducts: matchedProducts
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
        <Grid item xs={12}>
          <Typography variant="body2">
            <em>
              <strong>Disclaimer:</strong> 
              The suggested products are intended to be used as reference for informational purposes only. This is not a recommendation of where to buy. Clients need to research and verify which is suitable to their needs independently. Prices are indicative as per the data procured in March 2024. The prices may vary subject to the time of purchase, store, and mode of purchase.
            </em>
          </Typography>
        </Grid>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell style={{ color: "#000" }}>Ingredient</TableCell>
                <TableCell style={{ color: "#000" }}>Meal - Quantity/Unit</TableCell>
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
                    {ingredientDetails.quantity.map((mealQuantities, index) => (
                        <div key={index}>
                          <li>
                            {ingredientDetails.mealsById[index].name}{' - '}
                            {mealQuantities} {ingredientDetails.unit[index]} 
                            {mealCounts.get(ingredientDetails.mealsById[index].id)! > 1 && ` x${mealCounts.get(ingredientDetails.mealsById[index].id)}`}
                          </li>
                        </div>
                    ))}
                  </TableCell>
                  <TableCell>
                  {ingredientDetails.matchedProducts.length > 0 ? (
                    ingredientDetails.mealsById.length === 1 ? (
                      ingredientDetails.matchedProducts.slice(0, 3).map((product, index) => (
                        <div key={index}>
                          <li>
                            {product.productName} - ${product.price}
                          </li>
                        </div>
                      ))
                    ) : (
                      ingredientDetails.mealsById.map((meal, index) => (
                        <div key={index}>
                          <li>
                            {ingredientDetails.matchedProducts[index]?.productName} - ${ingredientDetails.matchedProducts[index]?.price}
                          </li>
                        </div>
                      ))
                    )
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