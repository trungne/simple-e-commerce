import type { RouterOutputs } from ".";

export type ProductList = RouterOutputs["product"]["productList"]['data'];
export type Product = ProductList[number];
