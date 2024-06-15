import "reflect-metadata";

import { buildSchema } from "type-graphql";
import { ProjectResolver } from "./resolvers/ProjectResolver";
import path from "path";
import { ApolloServer } from "apollo-server";
import { ProjectDatasource } from "./datasources/ProjectDatasource";

async function main() {
  const schema = await buildSchema({
    resolvers: [ProjectResolver],
    emitSchemaFile: path.resolve(__dirname, "schema.gql"),
  });
  const server = new ApolloServer({
    schema,
    csrfPrevention: true,
    cache: "bounded",
    dataSources: () => {
      return {
        projectDatasource: new ProjectDatasource(),
      };
    },
  });

  server.listen().then(({ url }) => {
    console.log(`🚀 Server ready at ${url}`);
  });
}

void main();
