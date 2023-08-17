import { Card, Text, Image } from "@mantine/core";
import type { MouseEventHandler } from "react";
import type { Product } from "~/types/product";

type Props = {
  product: Product;
  onClick?: MouseEventHandler<HTMLDivElement> | undefined;
};

export const ProductCard = ({ product, onClick }: Props) => {
  return (
    <Card className="flex h-60 flex-col" shadow="sm" padding="sm" withBorder>
      <Card.Section onClick={onClick} className="cursor-pointer">
        <Image src={product.image} height={100} alt={product.name} />
      </Card.Section>

      <Text className="line-clamp-1" size="sm" weight={500}>
        {product.name}
      </Text>

      <Text
        className="line-clamp-3 cursor-pointer md:line-clamp-4 "
        size="xs"
        color="dimmed"
        onClick={onClick}
      >
        {product.description}
      </Text>
    </Card>
  );
};
