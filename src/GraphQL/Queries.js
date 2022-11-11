import { gql } from "@apollo/client";

export const GET_ICC_WORLD_CUP = gql`
  query get_icc_world_cup {
    icc_world_cup {
      id
      team_match
      team_a
      team_b
      match_date
      match_time
      stadium
    }
  }
`;
