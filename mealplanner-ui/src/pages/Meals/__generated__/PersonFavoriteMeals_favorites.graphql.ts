/**
 * @generated SignedSource<<a3cb3fe6bb8522e44b2f1e0711e06711>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment, RefetchableFragment } from 'relay-runtime';
export type CategoryT = "BREAKFAST" | "LUNCH" | "DINNER" | "SNACK" | "%future added value";
import { FragmentRefs } from "relay-runtime";
export type PersonFavoriteMeals_favorites$data = {
  readonly people: {
    readonly nodes: ReadonlyArray<{
      readonly favoriteMeals: {
        readonly nodes: ReadonlyArray<{
          readonly meal: {
            readonly rowId: any;
            readonly nameEn: string;
            readonly nameFr: string | null;
            readonly descriptionEn: string | null;
            readonly descriptionFr: string | null;
            readonly categories: ReadonlyArray<CategoryT | null> | null;
            readonly tags: ReadonlyArray<string | null> | null;
            readonly code: any | null;
            readonly photoUrl: string | null;
            readonly videoUrl: string | null;
          } | null;
        }>;
      };
    }>;
  } | null;
  readonly " $fragmentType": "PersonFavoriteMeals_favorites";
};
export type PersonFavoriteMeals_favorites$key = {
  readonly " $data"?: PersonFavoriteMeals_favorites$data;
  readonly " $fragmentSpreads": FragmentRefs<"PersonFavoriteMeals_favorites">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [
    {
      "defaultValue": null,
      "kind": "LocalArgument",
      "name": "slug"
    }
  ],
  "kind": "Fragment",
  "metadata": {
    "refetch": {
      "connection": null,
      "fragmentPathInResult": [],
      "operation": require('./PersonFavoriteMealsRefetchQuery.graphql')
    }
  },
  "name": "PersonFavoriteMeals_favorites",
  "selections": [
    {
      "alias": null,
      "args": [
        {
          "fields": [
            {
              "fields": [
                {
                  "kind": "Variable",
                  "name": "equalTo",
                  "variableName": "slug"
                }
              ],
              "kind": "ObjectValue",
              "name": "slug"
            }
          ],
          "kind": "ObjectValue",
          "name": "filter"
        },
        {
          "kind": "Literal",
          "name": "first",
          "value": 1
        }
      ],
      "concreteType": "PeopleConnection",
      "kind": "LinkedField",
      "name": "people",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "concreteType": "Person",
          "kind": "LinkedField",
          "name": "nodes",
          "plural": true,
          "selections": [
            {
              "alias": null,
              "args": null,
              "concreteType": "FavoriteMealsConnection",
              "kind": "LinkedField",
              "name": "favoriteMeals",
              "plural": false,
              "selections": [
                {
                  "alias": null,
                  "args": null,
                  "concreteType": "FavoriteMeal",
                  "kind": "LinkedField",
                  "name": "nodes",
                  "plural": true,
                  "selections": [
                    {
                      "alias": null,
                      "args": null,
                      "concreteType": "Meal",
                      "kind": "LinkedField",
                      "name": "meal",
                      "plural": false,
                      "selections": [
                        {
                          "alias": null,
                          "args": null,
                          "kind": "ScalarField",
                          "name": "rowId",
                          "storageKey": null
                        },
                        {
                          "alias": null,
                          "args": null,
                          "kind": "ScalarField",
                          "name": "nameEn",
                          "storageKey": null
                        },
                        {
                          "alias": null,
                          "args": null,
                          "kind": "ScalarField",
                          "name": "nameFr",
                          "storageKey": null
                        },
                        {
                          "alias": null,
                          "args": null,
                          "kind": "ScalarField",
                          "name": "descriptionEn",
                          "storageKey": null
                        },
                        {
                          "alias": null,
                          "args": null,
                          "kind": "ScalarField",
                          "name": "descriptionFr",
                          "storageKey": null
                        },
                        {
                          "alias": null,
                          "args": null,
                          "kind": "ScalarField",
                          "name": "categories",
                          "storageKey": null
                        },
                        {
                          "alias": null,
                          "args": null,
                          "kind": "ScalarField",
                          "name": "tags",
                          "storageKey": null
                        },
                        {
                          "alias": null,
                          "args": null,
                          "kind": "ScalarField",
                          "name": "code",
                          "storageKey": null
                        },
                        {
                          "alias": null,
                          "args": null,
                          "kind": "ScalarField",
                          "name": "photoUrl",
                          "storageKey": null
                        },
                        {
                          "alias": null,
                          "args": null,
                          "kind": "ScalarField",
                          "name": "videoUrl",
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
    }
  ],
  "type": "Query",
  "abstractKey": null
};

(node as any).hash = "ce8985b62d5b8404af8ef4f68783f551";

export default node;
