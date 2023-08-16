import { TextInput } from "@mantine/core";

type Props = {
  onChange: (value: string) => void;
};

export const SearchInput = ({ onChange }: Props) => {
  return (
    <TextInput
      placeholder="Search for products"
      onChange={(event) => onChange(event.currentTarget.value)}
    />
  );
};
