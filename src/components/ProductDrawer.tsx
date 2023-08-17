import { faker } from "@faker-js/faker";
import {
  TextInput,
  Button,
  Group,
  Box,
  NumberInput,
  Select,
  Drawer,
  Textarea,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { useAtom } from "jotai";
import { isUndefined } from "lodash";
import { useEffect } from "react";
import { isProductDrawerOpenAtom, productDrawerAtom } from "~/hooks/drawer";
import { api } from "~/utils/api";

export const ProductDrawer = () => {
  const queryContext = api.useContext();

  const [isProductDrawerOpen, setIsProductDrawerOpen] = useAtom(
    isProductDrawerOpenAtom
  );
  const [productToBeEditted, setProductToBeEdittedInDrawer] =
    useAtom(productDrawerAtom);

  const { data: categoryResponse } = api.product.categoryList.useQuery();

  const productMutation = api.product.createProduct.useMutation({});
  const updateProduct = api.product.updateProduct.useMutation();

  const form = useForm({
    initialValues: {
      name: "",
      description: "",
      price: 0,
      quantity: 0,
      image: "",
      category: "",
    },

    validate: {
      name: (value) => (!!value ? null : "Name is required"),
      description: (value) => (!!value ? null : "Description is required"),
      price: (value) => (!isUndefined(value) ? null : "Price is required"),
      quantity: (value) =>
        !isUndefined(value) ? null : "Quantity is required",
      image: (value) => (!!value ? null : "Image is required"),
      category: (value) => (!!value ? null : "Category is required"),
    },
  });

  useEffect(() => {
    if (!productToBeEditted) {
      return;
    }

    form.setValues({
      name: productToBeEditted.name,
      description: productToBeEditted.description,
      price: parseFloat(productToBeEditted.price),
      quantity: productToBeEditted.quantity,
      image: productToBeEditted.image,
      category: productToBeEditted.category,
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [productToBeEditted, isProductDrawerOpen]);

  const onMutationSuccess = () => {
    void queryContext.product.invalidate();
  };

  const handleSubmit = (values: (typeof form)["values"]) => {
    if (productToBeEditted) {
      updateProduct.mutate(
        {
          ...values,
          id: productToBeEditted.id,
          price: values.price.toString(),
        },
        {
          onSuccess: onMutationSuccess,
        }
      );
    } else {
      productMutation.mutate(
        {
          ...values,
          price: values.price.toString(),
        },
        {
          onSuccess: onMutationSuccess,
        }
      );
    }

    handleClose();
  };

  const handleClose = () => {
    form.reset();
    setIsProductDrawerOpen(false);
    setProductToBeEdittedInDrawer(null);
  };

  return (
    <Drawer
      transitionProps={{
        duration: 0,
        transition: "fade",
      }}
      size="xl"
      opened={isProductDrawerOpen}
      onClose={handleClose}
      title="Create Product"
    >
      <Box mx="auto">
        <form
          onSubmit={form.onSubmit((values) => {
            handleSubmit(values);
          })}
        >
          <TextInput
            className="mb-2"
            withAsterisk
            label="Name"
            placeholder="Product ABC"
            {...form.getInputProps("name")}
          />

          <Textarea
            className="my-2"
            withAsterisk
            label="Description"
            placeholder="Helps you do XYZ"
            {...form.getInputProps("description")}
          />

          <TextInput
            className="my-2"
            withAsterisk
            label="Image"
            placeholder="Looks like this"
            rightSectionWidth={80}
            rightSection={
              <Button
                onClick={() => {
                  form.setFieldValue("image", faker.image.urlPicsumPhotos());
                }}
                className="bg-slate-500"
              >
                Random
              </Button>
            }
            {...form.getInputProps("image")}
          />

          <NumberInput
            className="my-2"
            hideControls
            placeholder="Costs you $123"
            label="Price"
            withAsterisk
            {...form.getInputProps("price")}
          />

          <NumberInput
            className="my-2"
            hideControls
            placeholder="Has 123 products in stock"
            label="Quantity"
            withAsterisk
            {...form.getInputProps("quantity")}
          />

          <Select
            {...form.getInputProps("category")}
            className="my-2"
            withAsterisk
            label="Category"
            placeholder="Category"
            data={
              categoryResponse?.map((category) => ({
                label: category.name,
                value: category.name,
              })) ?? []
            }
          />

          <Group position="right" mt="md">
            <Button className="bg-blue-400" variant="filled" type="submit">
              {productToBeEditted ? "Update" : "Create"}
            </Button>
            <Button
              onClick={handleClose}
              className=" bg-slate-400 hover:bg-slate-500"
              variant="filled"
            >
              Cancel
            </Button>
          </Group>
        </form>
      </Box>
    </Drawer>
  );
};
