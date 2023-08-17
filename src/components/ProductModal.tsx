import { ActionIcon, Flex, Modal, Text } from "@mantine/core";
import { IconEdit, IconTrash } from "@tabler/icons-react";
import { useAtom } from "jotai";

import { isProductDrawerOpenAtom, productDrawerAtom } from "~/hooks/drawer";
import type { Product } from "~/types/product";
import { api } from "~/utils/api";

type ModalProps = {
  product?: Product;
  onClose: () => void | undefined;
};

export const ProductModal = ({ product, onClose }: ModalProps) => {
  const [, setProductDrawerOpen] = useAtom(isProductDrawerOpenAtom);
  const queryContext = api.useContext();
  const [, setProductToBeEdittedInDrawer] = useAtom(productDrawerAtom);
  const { data: productDetail } = api.product.productDetail.useQuery(
    {
      id: product?.id ?? "",
    },
    {
      enabled: !!product,
    }
  );

  const deleteProductMutation = api.product.deleteProduct.useMutation();

  const handleEditClicked = () => {
    if (!productDetail) {
      return;
    }

    setProductToBeEdittedInDrawer(productDetail);
    setProductDrawerOpen(true);
  };

  const handleDeleteClicked = () => {
    if (!productDetail) {
      return;
    }
    deleteProductMutation.mutate(
      {
        id: productDetail.id,
      },
      {
        onSuccess: () => {
          void queryContext.product.productList.invalidate();
          void queryContext.product.categoryList.invalidate();
          onClose();
        },
      }
    );
  };

  return (
    <Modal
      zIndex={100}
      title={
        <Text className="text-lg font-bold" c="blue">
          {productDetail?.name}
        </Text>
      }
      size="lg"
      radius="md"
      opened={!!product}
      withCloseButton
      onClose={onClose}
      centered
    >
      <Text size="sm" mb="xs" weight={500}>
        <Text span c="blue" fw={700}>
          Description:{" "}
        </Text>
        {productDetail?.description}
      </Text>
      <Text size="sm" mb="xs" weight={500}>
        <Text span c="blue" fw={700}>
          Price:{" "}
        </Text>
        {productDetail?.price}
      </Text>
      <Text size="sm" mb="xs" weight={500}>
        <Text span c="blue" fw={700}>
          Quantity:{" "}
        </Text>
        {productDetail?.quantity}
      </Text>
      <Text size="sm" mb="xs" weight={500}>
        <Text span c="blue" fw={700}>
          Category:{" "}
        </Text>
        {productDetail?.category}
      </Text>
      <Flex gap={8} className="justify-between">
        <ActionIcon
          onClick={handleEditClicked}
          className="w-32 bg-green-500 hover:bg-green-600"
        >
          <IconEdit color="white" size={18} />
        </ActionIcon>
        <ActionIcon
          onClick={handleDeleteClicked}
          className=" bg-red-500 hover:bg-red-400"
        >
          <IconTrash color="white" size={18} />
        </ActionIcon>
      </Flex>
    </Modal>
  );
};
