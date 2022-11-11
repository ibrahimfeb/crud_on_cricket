import {
  Box,
  Flex,
  Heading,
  useColorMode,
  TableContainer,
  Table,
  Tbody,
  Thead,
  Stack,
  Tr,
  Th,
  Text,
  Td,
  Button,
  Center,
} from "@chakra-ui/react";
import { React } from "react";
import { SunIcon, MoonIcon } from "@chakra-ui/icons";
import { useQuery } from "@apollo/client";
import { GET_ICC_WORLD_CUP } from "../../GraphQL/Queries";
import InsertICCDataModal from "../Modals/InsertICCDataModal";
import UpdateICCData from "../Modals/UpdateICCData";
import DeleteICCData from "../Modals/DeleteICCData";

const ICCData = () => {
  const { colorMode, toggleColorMode } = useColorMode();

  const RenderedData = () => {
    const { loading, error, data } = useQuery(GET_ICC_WORLD_CUP);

    if (loading) return <Text>Loading...</Text>;
    if (error) return <Text>Error :(</Text>;

    return (
      <Stack mt={"10px"}>
        <Center>
          <Heading size={"sm"}>ICC Men's T20 World Cup,Australia,2022</Heading>
        </Center>
        <TableContainer>
          <Table variant="simple">
            <Thead>
              <Tr>
                <Th>Match</Th>
                <Th>Team A</Th>
                <Th>Team B</Th>
                <Th>Date</Th>
                <Th>Time</Th>
                <Th>Ground</Th>
                <Th>Update</Th>
                <Th>Delete</Th>
              </Tr>
            </Thead>
            <Tbody>
              {data
                ? data.icc_world_cup.map(
                    ({
                      id,
                      team_match,
                      team_a,
                      team_b,
                      match_date,
                      match_time,
                      stadium,
                    }) => (
                      <Tr>
                        <Td>{team_match}</Td>
                        <Td>{team_a}</Td>
                        <Td>{team_b}</Td>
                        <Td>{match_date}</Td>
                        <Td>{match_time}</Td>
                        <Td>{stadium}</Td>
                        <Td>
                          <UpdateICCData
                            id={id}
                            team_match={team_match}
                            team_a={team_a}
                            team_b={team_b}
                            match_date={match_date}
                            match_time={match_time}
                            stadium={stadium}
                          />
                        </Td>

                        <Td>
                          <DeleteICCData
                            id={id}
                            team_match={team_match}
                          />
                        </Td>
                      </Tr>
                    )
                  )
                : ""}
            </Tbody>
          </Table>
        </TableContainer>
      </Stack>
    );
  };
  return (
    <Box w="90%" m="auto" maxW="1200">
      <Flex
        w="full"
        my={5}
        alignItems="center"
        justifyContent="flex-start"
        as="header"
      >
        <Heading mr="auto" size={{ base: "sm", md: "md" }}>
          Live Matches
        </Heading>
        <Button
          size={{ base: "xs", md: "md" }}
          mr={2}
          onClick={toggleColorMode}
        >
          {colorMode === "dark" ? <SunIcon /> : <MoonIcon />}
        </Button>
        <InsertICCDataModal />
      </Flex>
      {<RenderedData />}
    </Box>
  );
};

export default ICCData;
