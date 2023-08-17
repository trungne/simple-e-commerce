import { atom } from "jotai";
import type { Product } from "~/types/product";

const _productDrawerAtom = atom<Product | null>(null);

const productDrawerAtom = atom(
  (get) => get(_productDrawerAtom),
  (_get, set, update: Product | null) => {
    set(_productDrawerAtom, update);
  }
);

const _isProductDrawerOpenAtom = atom<boolean>(false);

const isProductDrawerOpenAtom = atom(
  (get) => get(_isProductDrawerOpenAtom),
  (_get, set, update: boolean) => {
    set(_isProductDrawerOpenAtom, update);
  }
);

export { productDrawerAtom, isProductDrawerOpenAtom };
