import { AppShell, Header, Navbar } from "@mantine/core";
import Head from "next/head";
import { api } from "~/utils/api";

export default function Home() {
  const product = api.product.productList.useQuery({});
  const category = api.product.categoryList.useQuery();

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
            <Navbar width={{ base: 300 }} height={500} p="xs">
              {/* Navbar content */}
              {category.data?.map((category, idx) => {
                // TODO: use button component https://mantine.dev/core/button/
                return <h2 key={idx}>{category.name}</h2>;
              })}
            </Navbar>
          }
          header={
            <Header height={60} p="xs">
              {/* Header content */}
            </Header>
          }
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
          {product.data?.map((product) => {
            // TODO: implement: https://mantine.dev/core/card/
            return <div key={product.id}>{product.image}</div>;
          })}
        </AppShell>
      </main>
    </>
  );
}
