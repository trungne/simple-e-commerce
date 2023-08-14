import { Card, Group,Text,Button,Image } from "@mantine/core";
import type { Product } from "~/types/product";

export type Props = {
    product: Product
    onClick: (product: Product) => void
}

export const ProductCard = ({product, onClick}: Props) => {
  return (
    <Card
      key={product.id}
      style={{ height: 250, flexBasis: "30%" }}
      shadow="sm"
      padding="sm"
      withBorder
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
