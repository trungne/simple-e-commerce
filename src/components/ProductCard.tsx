import { Card, Group,Text,Button,Image } from "@mantine/core";
import type { MouseEventHandler } from "react";
import type { Product } from "~/types/product";

export type Props = {
    product: Product
    onClick?: MouseEventHandler<HTMLDivElement> | undefined;
}

export const ProductCard = ({product, onClick}: Props) => {
  return (
    <Card
      style={{ height: 250, flexBasis: "30%" }}
      shadow="sm"
      padding="sm"
      withBorder
      onClick={onClick}
    >
      <Card.Section>
        <Image src={product.image} height={100} alt="Image" />
      </Card.Section>

      <Group position="apart" mt="md" mb="xs">
        <Text size="sm" weight={500} truncate>
          {product.name}
        </Text>
      </Group>

      <Text size="xs" color="dimmed" truncate>
        {product.description}
      </Text>

      <Button variant="light" color="blue" fullWidth mt="lg" radius="md">
        Buy now
      </Button>
    </Card>
  );
};
