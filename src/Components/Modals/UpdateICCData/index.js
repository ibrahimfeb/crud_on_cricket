import {
  Flex,
  Stack,
  Button,
  FormControl,
  FormLabel,
  Input,
  useToast,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  SimpleGrid,
} from "@chakra-ui/react";
import { React, useState } from "react";
import { EditIcon } from "@chakra-ui/icons";
import { GET_ICC_WORLD_CUP } from "../../../GraphQL/Queries";
import { useQuery, useMutation } from "@apollo/client";
import { UPDATE_ICC_WORLD_CUP } from "../../../GraphQL/Mutations";

const UpdateICCData = (props) => {
  const [updateId, setUpdateId] = useState(props.id);
  const [updateTeamMatch, setUpdateTeamMatch] = useState(props.team_match);
  const [updateTeamA, setUpdateTeamA] = useState(props.team_a);
  const [updateTeamB, setUpdateTeamB] = useState(props.team_b);
  const [updateMatchDate, setUpdateMatchDate] = useState(props.match_date);
  const [updateMatchTime, setUpdateMatchTime] = useState(props.match_time);
  const [updateMatchStadium, setUpdateMatchStadium] = useState(props.stadium);
  const toast = useToast();
  const {
    isOpen: isUpdateOpen,
    onOpen: onUpdateOpen,
    onClose: onUpdateClose,
  } = useDisclosure();

  const [updateICCWorldCup, { loading, error, reset, refetch }] =
    useMutation(UPDATE_ICC_WORLD_CUP);

  const onUpdateHandler = (e) => {
    e.preventDefault();
    updateICCWorldCup({
      variables: {
        id: updateId,
        team_match: updateTeamMatch,
        team_a: updateTeamA,
        team_b: updateTeamB,
        match_date: updateMatchDate,
        match_time: updateMatchTime,
        stadium: updateMatchStadium,
      },
      onCompleted(res) {
        console.log(res);
        toast({
          title: "Record Added.",
          description: "Record Uppdated Succefully.",
          status: "success",
          duration: 9000,
          isClosable: true,
        });
      },
      refetchQueries: [{ query: GET_ICC_WORLD_CUP }],
    });
    if (loading) {
      console.log("Submitting");
    } else if (error) {
      toast({
        title: `${error.message}`,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    } else {
      reset();
      onUpdateClose();
      toast({
        title: `${props.team_match} Updated`,
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    }
  };
  return (
    <>
      <Button
        onClick={onUpdateOpen}
        bg="#294652"
        color="white"
        size="md"
        p={1}
        w="fit-content"
      >
        <EditIcon />
      </Button>

      <Modal isOpen={isUpdateOpen} onClose={onUpdateClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Update Schedule</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <SimpleGrid width="full" columns={1} columnGap={3} rowGap={6}>
              <Stack>
                <form onSubmit={onUpdateHandler}>
                  <FormControl>
                    <FormLabel htmlFor="name">Match</FormLabel>
                    <Input
                      type="text"
                      id="name"
                      value={updateTeamMatch}
                      onChange={(e) => setUpdateTeamMatch(e.target.value)}
                    />
                  </FormControl>

                  <FormControl>
                    <FormLabel mt={2}>Team A</FormLabel>
                    <Input
                      value={updateTeamA}
                      onChange={(e) => setUpdateTeamA(e.target.value)}
                    />
                  </FormControl>

                  <FormControl>
                    <FormLabel mt={2}>Team B</FormLabel>
                    <Input
                      value={updateTeamB}
                      onChange={(e) => setUpdateTeamB(e.target.value)}
                    />
                  </FormControl>

                  <FormControl>
                    <FormLabel mt={2}>Date</FormLabel>
                    <Input
                      value={updateMatchDate}
                      onChange={(e) => setUpdateMatchDate(e.target.value)}
                    />
                  </FormControl>
                  <FormControl>
                    <FormLabel mt={2}>Time</FormLabel>
                    <Input
                      value={updateMatchTime}
                      onChange={(e) => setUpdateMatchTime(e.target.value)}
                    />
                  </FormControl>
                  <FormControl>
                    <FormLabel mt={2}>Ground</FormLabel>
                    <Input
                      value={updateMatchStadium}
                      type="text"
                      onChange={(e) => setUpdateMatchStadium(e.target.value)}
                    />
                  </FormControl>
                  <Flex mt={3} ml="auto">
                    <Button
                      mr={2}
                      colorScheme="blue"
                      isLoading={loading}
                      type="submit"
                    >
                      Update Schedule
                    </Button>
                    <Button variant="ghost" onClick={onUpdateClose}>
                      Cancel
                    </Button>
                  </Flex>
                </form>
              </Stack>
            </SimpleGrid>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default UpdateICCData;
