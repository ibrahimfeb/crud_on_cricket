import {
  Button,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalBody,
  ModalContent,
  ModalCloseButton,
  ModalHeader,
  Flex,
  SimpleGrid,
  Input,
  useToast,
  FormControl,
  FormLabel,
} from "@chakra-ui/react";
import { React, useState } from "react";
import { GET_ICC_WORLD_CUP } from "../../../GraphQL/Queries";
import { INSERT_ICC_WORLD_CUP } from "../../../GraphQL/Mutations";
import { useQuery, useMutation } from "@apollo/client";

const InsertICCDataModal = () => {
  const [teamMatch, setTeamMatch] = useState("");
  const [teamA, setTeamA] = useState("");
  const [teamB, setTeamB] = useState("");
  const [matchDate, setMatchDate] = useState("");
  const [matchTime, setMatchTime] = useState("");
  const [matchStadium, setMatchStadium] = useState("");

  const { isOpen, onOpen, onClose } = useDisclosure();
  const { loading, error, data, refetch } = useQuery(GET_ICC_WORLD_CUP);
  const toast = useToast();

  //   Insert
  const [addMatch, { loading: insertLoading }] = useMutation(
    INSERT_ICC_WORLD_CUP,
    {
      variables: {
        team_match: teamMatch,
        team_a: teamA,
        team_b: teamB,
        match_date: matchDate,
        match_time: matchTime,
        stadium: matchStadium,
      },
      onCompleted(res) {
        console.log(res);
        toast({
          title: "Record Added.",
          description: "Record Added Succefully.",
          status: "success",
          duration: 9000,
          isClosable: true,
        });
        refetch();
        setTeamMatch("");
        setTeamA("");
        setTeamB("");
        setMatchDate("");
        setMatchTime("");
        setMatchStadium("");
      },
      onError(error) {
        console.log(error);
        toast({
          title: "Something Went Wrong.",
          description: "Fail to add.",
          status: "error",
          duration: 9000,
          isClosable: true,
        });
      },
    }
  );
  //   End Insert

  // for checking purpose
  const addNewData = () => {
    console.log({ teamMatch });
    console.log({ teamA });
    console.log({ teamB });
    console.log({ matchDate });
    console.log({ matchTime });
    console.log({ matchStadium });
    addMatch();
  };
  // End for checking purpose
  return (
    <>
      <Button
        onClick={onOpen}
        size={{ base: "xs", md: "md" }}
        p={1}
        w="fit-content"
      >
        Fix New Match
      </Button>

      {/* insert modal */}
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Fix New Match</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <SimpleGrid width="full" columns={1} columnGap={3} rowGap={6}>
              <Flex justifyContent={"center"} mt={"20px"} alignItems={"center"}>
                {/* Fields */}
                <FormControl w={"300px"}>
                  <FormLabel>
                    Match
                    <Input
                      value={teamMatch}
                      placeholder={"Match No"}
                      onChange={(e) => setTeamMatch(e.target.value)}
                    />
                  </FormLabel>

                  <FormLabel>
                    Team A
                    <Input
                      value={teamA}
                      placeholder={"PAK"}
                      onChange={(e) => setTeamA(e.target.value)}
                    />
                  </FormLabel>

                  <FormLabel>
                    Team B
                    <Input
                      placeholder={"IND"}
                      value={teamB}
                      onChange={(e) => setTeamB(e.target.value)}
                    />
                  </FormLabel>
                  <FormLabel>
                    Date
                    <Input
                      placeholder={"2022-10-23"}
                      value={matchDate}
                      onChange={(e) => setMatchDate(e.target.value)}
                    />
                  </FormLabel>
                  <FormLabel>
                    Time
                    <Input
                      placeholder={"09:00"}
                      value={matchTime}
                      onChange={(e) => setMatchTime(e.target.value)}
                    />
                  </FormLabel>
                  <FormLabel>
                    Ground
                    <Input
                      placeholder={"Melbourne Cricket Ground"}
                      value={matchStadium}
                      onChange={(e) => setMatchStadium(e.target.value)}
                    />
                  </FormLabel>

                  <Flex mt={3} ml="auto">
                    <Button
                      onClick={addNewData}
                      bg={"blue.300"}
                      color={"white"}
                      insertLoading={loading}
                    >
                      Submit
                    </Button>
                    <Button variant="ghost" onClick={onClose}>
                      Cancel
                    </Button>
                  </Flex>
                </FormControl>
                {/* End Fields */}
              </Flex>
            </SimpleGrid>
          </ModalBody>
        </ModalContent>
      </Modal>
      {/* End insert modal */}
    </>
  );
};

export default InsertICCDataModal;
