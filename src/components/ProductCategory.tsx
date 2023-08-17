import { Button, Text } from "@mantine/core";

type Props = {
  onChange: (value: string) => void;
  categoryName: string;
  count: number;
  isSelected: boolean;
};

export const ProductCategory = ({
  onChange,
  categoryName,
  isSelected,
  count,
}: Props) => {
  return (
    <Button
      onClick={() => {
        onChange(categoryName);
      }}
      classNames={{
        label: "flex w-full items-center justify-between",
      }}
      variant="subtle"
      color={isSelected ? "blue" : "dark"}
    >
      <Text>{categoryName}</Text>
      <Text> ({count})</Text>
    </Button>
  );
};
