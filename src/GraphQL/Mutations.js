import { gql } from "@apollo/client";

export const INSERT_ICC_WORLD_CUP = gql`
  mutation (
    $team_match: String!
    $team_a: String!
    $team_b: String!
    $match_date: date!
    $match_time: time!
    $stadium: String!
  ) {
    insert_icc_world_cup_one(
      object: {
        team_match: $team_match
        team_a: $team_a
        team_b: $team_b
        match_date: $match_date
        match_time: $match_time
        stadium: $stadium
      }
    ) {
      id
    }
  }
`;

export const UPDATE_ICC_WORLD_CUP = gql`
  mutation updateICCWorldCup(
    $id:Int!
    $team_match: String!
    $team_a: String!
    $team_b: String!
    $match_date: date!
    $match_time: time!
    $stadium: String!
  ) {
    update_icc_world_cup_by_pk(
      pk_columns: { id: $id }
      _set: {
        id:$id
        team_match: $team_match
        team_a: $team_a
        team_b: $team_b
        match_date: $match_date
        match_time: $match_time
        stadium: $stadium
      }
    ) {
      id
      team_match
      team_a
      team_b
      match_time
      stadium
      match_date
    }
  }
`;


export const DELETE_ICC_WORLD_CUP = gql`
  mutation deleteICCWorldCup($id: Int!) {
    delete_icc_world_cup_by_pk(id: $id) {
      id
    }
  }
`;
