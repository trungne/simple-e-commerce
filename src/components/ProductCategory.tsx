import { Button } from "@mantine/core";

type Props = {
  onChange: (value: string) => void;
  categoryName: string;
  isSelected: boolean;
};

export const ProductCategory = ({
  onChange,
  categoryName,
  isSelected,
}: Props) => {
  return (
    <Button
      onClick={() => {
        onChange(categoryName);
      }}
      variant="subtle"
      color={isSelected ? "blue" : "dark"}
    >
      {categoryName}
    </Button>
  );
};
