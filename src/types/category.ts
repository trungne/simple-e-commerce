import type { RouterOutputs } from ".";

export type CategoryList = RouterOutputs["product"]["categoryList"];
export type Category = CategoryList[number];
