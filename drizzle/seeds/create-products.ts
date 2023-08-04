import { products } from "~db/schema";
import type { NewProduct } from "~db/schema";

import { faker } from "@faker-js/faker";
import { db } from "..";

const PRODUCT_NUM = 500;

const createProducts = async () => {
  const randomProducts: NewProduct[] = [];

  for (let i = 0; i < PRODUCT_NUM; i++) {
    randomProducts.push({
      name: faker.commerce.productName(),
      description: faker.commerce.productDescription(),
      price: faker.commerce.price(),
      quantity: faker.number.int({
        min: 10,
        max: 1000,
      }),
      category: faker.commerce.department(),
      image: faker.image.urlPicsumPhotos(),
    });
  }

  await db.insert(products).values(randomProducts).execute();
};

createProducts()
  .then(() => {
    console.log("Products created!");
    process.exit(0);
  })
  .catch((err) => {
    console.error("Error creating products", err);
    process.exit(1);
  });
