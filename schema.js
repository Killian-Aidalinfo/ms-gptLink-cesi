import { gql } from 'apollo-server-express';

const typeDefs = gql`
    extend type Query {
        getCompletion(prompt: String!): String
    }
`;

export default typeDefs;
