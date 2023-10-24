import { gql } from 'graphql-tag';

const typeDefs = gql`
    extend type Query {
        getCompletion(prompt: String!): String
    }
`;

export default typeDefs;
