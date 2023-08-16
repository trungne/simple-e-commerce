import { Card, Group, Text, Button, Image } from "@mantine/core";
import type { MouseEventHandler } from "react";
import type { Product } from "~/types/product";

type Props = {
  product: Product;
  onClick?: MouseEventHandler<HTMLDivElement> | undefined;
};

export const ProductCard = ({ product, onClick }: Props) => {
  return (
    <Card
      style={{ height: 250, flexBasis: "30%" }}
      shadow="sm"
      padding="sm"
      withBorder
    >
      <Card.Section
        onClick={onClick}
        sx={{
          cursor: "pointer",
        }}
      >
        <Image src={product.image} height={100} alt="Image" />
      </Card.Section>

      <Group
        position="apart"
        mt="md"
        mb="xs"
        onClick={onClick}
        sx={{
          cursor: "pointer",
        }}
      >
        <Text size="sm" weight={500} truncate>
          {product.name}
        </Text>
      </Group>

      <Text
        size="xs"
        color="dimmed"
        lineClamp={2}
        onClick={onClick}
        sx={{
          cursor: "pointer",
        }}
      >
        {product.description}
      </Text>

      <Button variant="light" color="blue" fullWidth mt="lg" radius="md">
        Buy now
      </Button>
    </Card>
  );
};
