import "reflect-metadata";

import { buildSchema } from "type-graphql";
import { ProjectResolver } from "./resolvers/ProjectResolver";
import { LayerResolver } from "./resolvers/LayerResolver";
import { ComponentResolver } from "./resolvers/ComponentResolver";
import path from "path";
import { ApolloServer } from "apollo-server";
import { ProjectDatasource } from "./datasources/ProjectDatasource";
import { applyMiddleware } from "graphql-middleware";
import { loggingTopLevelMiddleware } from "./middlewares/LoggingMiddleware";

async function main() {
  const schema = await buildSchema({
    resolvers: [ProjectResolver, LayerResolver, ComponentResolver],
    emitSchemaFile: path.resolve(__dirname, "schema.gql"),
  });
  const schemaWithMiddleware = applyMiddleware(schema, loggingTopLevelMiddleware);
  const server = new ApolloServer({
    schema: schemaWithMiddleware,
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
