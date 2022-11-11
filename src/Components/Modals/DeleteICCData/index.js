import {
  Box,
  Button,
  useToast,
  useDisclosure,
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogOverlay,
  AlertDialogBody,
  AlertDialogFooter,

} from "@chakra-ui/react";
import { useMutation } from "@apollo/client";
import { useRef } from "react";
import { DeleteIcon } from "@chakra-ui/icons";
import { GET_ICC_WORLD_CUP } from "../../../GraphQL/Queries";
import { DELETE_ICC_WORLD_CUP } from "../../../GraphQL/Mutations";

function DeleteICCData(props) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [deleteICCWorldCup] = useMutation(DELETE_ICC_WORLD_CUP);
  const toast = useToast();

  const cancelRef = useRef(null);

  const onDeleteHandler = () => {

    deleteICCWorldCup({
      variables: {
        id: props.id,
      },
      refetchQueries: [{ query: GET_ICC_WORLD_CUP }],
    });

    onClose();
    toast({
      title: `${props.team_match} Deleted.`,
      status: "success",
      duration: 5000,
      isClosable: true,
    });
  };
  return (
    <>
      <Button
        colorScheme="red"
        onClick={onOpen}
        size="md"
        p={1}
        mb={0.5}
        w="fit-content"
      >
        <DeleteIcon />
      </Button>

      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
        isCentered
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Delete Match
            </AlertDialogHeader>

            <AlertDialogBody>
              Are you sure? You want to delete{" "}
              <Box
                textTransform="capitalize"
                display="inline"
                fontWeight="bolder"
              >
                {props.team_match}
              </Box>
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                Cancel
              </Button>
              <Button colorScheme="red" onClick={onDeleteHandler} ml={3}>
                Delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
}
export default DeleteICCData;
