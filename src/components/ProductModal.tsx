import { Modal, Text, Title } from "@mantine/core";

type ModalProps = {
    name?: string 
    description?: string 
    price?: string 
    quantity?: number 
    category?: string
    opened: boolean
    onClose: () => void | undefined;
}

export const ProductModal = (props: ModalProps) => {
    return (
        <Modal
            title={<Title order={3}><Text c='blue'>{props.name}</Text></Title>}
            size="lg" radius="md"
            opened={!!props.opened}
            withCloseButton
            onClose={props.onClose}
            centered
          >
            
            <Text size="sm" mb="xs" weight={500}>
              <Text span c='blue' fw={700}>Description: </Text> 
              {props.description}
            </Text>
            <Text size="sm" mb="xs" weight={500}>
              <Text span c='blue' fw={700}>Price: </Text> 
              {props.price}
            </Text>
            <Text size="sm" mb="xs" weight={500}>
              <Text span c='blue' fw={700}>Quantity: </Text>  
              {props.quantity}
            </Text>
            <Text size="sm" mb="xs" weight={500}>
              <Text span c='blue' fw={700}>Category: </Text>   
              {props.category}
            </Text>
          </Modal>
    )
}