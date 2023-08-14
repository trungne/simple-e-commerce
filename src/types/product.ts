import type { RouterOutputs } from ".";

export type ProductList = RouterOutputs["product"]["productList"];
export type Product = ProductList[number];
