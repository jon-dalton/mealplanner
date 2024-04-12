/**
 * @generated SignedSource<<2e0ef71f8bf18453e48cbda643744083>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
export type ShoppingListQuery$variables = {
  rowId: any;
};
export type ShoppingListQuery$data = {
  readonly mealPlan: {
    readonly nameEn: string;
    readonly descriptionEn: string | null;
    readonly person: {
      readonly fullName: string;
    } | null;
    readonly mealPlanEntries: {
      readonly nodes: ReadonlyArray<{
        readonly meal: {
          readonly id: string;
          readonly nameEn: string;
          readonly ingredients: {
            readonly nodes: ReadonlyArray<{
              readonly id: string;
              readonly name: string;
              readonly quantity: any;
              readonly unit: string;
              readonly productKeyword: string;
              readonly matchedProducts: {
                readonly nodes: ReadonlyArray<{
                  readonly id: string;
                  readonly nameEn: string;
                  readonly price: any;
                }>;
              };
            }>;
          };
        } | null;
      }>;
    };
  } | null;
};
export type ShoppingListQuery = {
  variables: ShoppingListQuery$variables;
  response: ShoppingListQuery$data;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "rowId"
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "rowId",
    "variableName": "rowId"
  }
],
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "nameEn",
  "storageKey": null
},
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "descriptionEn",
  "storageKey": null
},
v4 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "fullName",
  "storageKey": null
},
v5 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v6 = {
  "alias": null,
  "args": null,
  "concreteType": "Meal",
  "kind": "LinkedField",
  "name": "meal",
  "plural": false,
  "selections": [
    (v5/*: any*/),
    (v2/*: any*/),
    {
      "alias": null,
      "args": null,
      "concreteType": "IngredientsConnection",
      "kind": "LinkedField",
      "name": "ingredients",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "concreteType": "Ingredient",
          "kind": "LinkedField",
          "name": "nodes",
          "plural": true,
          "selections": [
            (v5/*: any*/),
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "name",
              "storageKey": null
            },
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "quantity",
              "storageKey": null
            },
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "unit",
              "storageKey": null
            },
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "productKeyword",
              "storageKey": null
            },
            {
              "alias": null,
              "args": null,
              "concreteType": "ProductsConnection",
              "kind": "LinkedField",
              "name": "matchedProducts",
              "plural": false,
              "selections": [
                {
                  "alias": null,
                  "args": null,
                  "concreteType": "Product",
                  "kind": "LinkedField",
                  "name": "nodes",
                  "plural": true,
                  "selections": [
                    (v5/*: any*/),
                    (v2/*: any*/),
                    {
                      "alias": null,
                      "args": null,
                      "kind": "ScalarField",
                      "name": "price",
                      "storageKey": null
                    }
                  ],
                  "storageKey": null
                }
              ],
              "storageKey": null
            }
          ],
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "ShoppingListQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "MealPlan",
        "kind": "LinkedField",
        "name": "mealPlan",
        "plural": false,
        "selections": [
          (v2/*: any*/),
          (v3/*: any*/),
          {
            "alias": null,
            "args": null,
            "concreteType": "Person",
            "kind": "LinkedField",
            "name": "person",
            "plural": false,
            "selections": [
              (v4/*: any*/)
            ],
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "concreteType": "MealPlanEntriesConnection",
            "kind": "LinkedField",
            "name": "mealPlanEntries",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "concreteType": "MealPlanEntry",
                "kind": "LinkedField",
                "name": "nodes",
                "plural": true,
                "selections": [
                  (v6/*: any*/)
                ],
                "storageKey": null
              }
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "ShoppingListQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "MealPlan",
        "kind": "LinkedField",
        "name": "mealPlan",
        "plural": false,
        "selections": [
          (v2/*: any*/),
          (v3/*: any*/),
          {
            "alias": null,
            "args": null,
            "concreteType": "Person",
            "kind": "LinkedField",
            "name": "person",
            "plural": false,
            "selections": [
              (v4/*: any*/),
              (v5/*: any*/)
            ],
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "concreteType": "MealPlanEntriesConnection",
            "kind": "LinkedField",
            "name": "mealPlanEntries",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "concreteType": "MealPlanEntry",
                "kind": "LinkedField",
                "name": "nodes",
                "plural": true,
                "selections": [
                  (v6/*: any*/),
                  (v5/*: any*/)
                ],
                "storageKey": null
              }
            ],
            "storageKey": null
          },
          (v5/*: any*/)
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "130a7a96b9d719a3b7c9215c7a35955a",
    "id": null,
    "metadata": {},
    "name": "ShoppingListQuery",
    "operationKind": "query",
    "text": "query ShoppingListQuery(\n  $rowId: BigInt!\n) {\n  mealPlan(rowId: $rowId) {\n    nameEn\n    descriptionEn\n    person {\n      fullName\n      id\n    }\n    mealPlanEntries {\n      nodes {\n        meal {\n          id\n          nameEn\n          ingredients {\n            nodes {\n              id\n              name\n              quantity\n              unit\n              productKeyword\n              matchedProducts {\n                nodes {\n                  id\n                  nameEn\n                  price\n                }\n              }\n            }\n          }\n        }\n        id\n      }\n    }\n    id\n  }\n}\n"
  }
};
})();

(node as any).hash = "7523bcd6e3a4adc111c4a3ff1e3a307f";

export default node;
