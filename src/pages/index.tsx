import {
  AppShell,
  Box,
  Divider,
  Flex,
  Header,
  Navbar,
  Pagination,
  ScrollArea,
  Space,
  Text,
  Button,
} from "@mantine/core";
import { useDebouncedState } from "@mantine/hooks";

import Head from "next/head";
import { useState } from "react";
import { ProductCard } from "~/components/ProductCard";
import { ProductCategory } from "~/components/ProductCategory";
import { ProductModal } from "~/components/ProductModal";
import { SearchInput } from "~/components/SearchInput";
import type { Product } from "~/types/product";
import { api } from "~/utils/api";

export default function Home() {
  const [categoryFilter, setCategoryFilter] = useState<string | undefined>(
    undefined
  );

  const [page, setPage] = useState(0);
  const [searchInput, setSearchInput] = useDebouncedState("", 200);

  const { data: productListResponse } = api.product.productList.useQuery({
    name: searchInput,
    category: categoryFilter,
    page,
    perPage: 12,
  });
  const category = api.product.categoryList.useQuery();

  const [productToShowInDialog, setProductToShowInDialog] = useState<Product>();

  return (
    <>
      <Head>
        <title>Create T3 App</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex min-h-screen flex-col items-center justify-center">
        <AppShell
          padding="md"
          navbar={
            <Navbar width={{ base: 220 }} p="xs">
              <Navbar.Section mt="xs">{/* Header with logo */}</Navbar.Section>

              <Box>
                <SearchInput onChange={setSearchInput} />
                <Text
                  align="center"
                  fw={700}
                  fz="xl"
                  variant="gradient"
                  gradient={{ from: "green", to: "blue", deg: 45 }}
                >
                  Categories
                </Text>
                <Space h="md"></Space>
              </Box>
              <Divider />
              <Navbar.Section grow component={ScrollArea} mx="-xs" px="xs">
                {/* Navbar content */}
                <Button.Group orientation="vertical">
                  {category.data?.map((category, idx) => {
                    const isSelected = categoryFilter === category.name;

                    return (
                      <ProductCategory
                        key={idx}
                        categoryName={category.name}
                        isSelected={isSelected}
                        onChange={(categoryName) => {
                          if (isSelected) {
                            setCategoryFilter(undefined);
                            return;
                          }

                          setCategoryFilter(categoryName);
                        }}
                      />
                    );
                  })}
                </Button.Group>
              </Navbar.Section>

              <Navbar.Section>{/* Footer with user */}</Navbar.Section>
            </Navbar>
          }
          // header={
          //   <Header height={60} p="xs">
          //     {/* Header content */}
          //   </Header>
          // }
          styles={(theme) => ({
            main: {
              backgroundColor:
                theme.colorScheme === "dark"
                  ? theme.colors.dark[8]
                  : theme.colors.gray[0],
            },
          })}
        >
          {/* Body */}
          <Flex
            mih={50}
            gap="md"
            justify="center"
            align="flex-start"
            direction="row"
            wrap="wrap"
          >
            {productListResponse?.data.map((product) => {
              return (
                <ProductCard
                  key={product.id}
                  product={product}
                  onClick={() => {
                    setProductToShowInDialog(product);
                  }}
                />
              );
            })}
          </Flex>
          <Flex className="mt-auto" justify="center">
            <Pagination
              value={page + 1}
              onChange={(page) => {
                setPage(page - 1);
              }}
              total={productListResponse?.totalPage ?? 0}
            />
          </Flex>
          <ProductModal
            name={productToShowInDialog?.name}
            description={productToShowInDialog?.description}
            price={productToShowInDialog?.price}
            quantity={productToShowInDialog?.quantity}
            category={productToShowInDialog?.category}
            opened={!!productToShowInDialog}
            onClose={() => {
              setProductToShowInDialog(undefined);
            }}
          />
        </AppShell>
      </main>
    </>
  );
}
