import { IMiddlewareFunction } from 'graphql-middleware';
import { GraphQLResolveInfo } from 'graphql';

// Notes: Each field in the GraphQL query is resolved individually, 
// and the middleware logs each resolution. 
// To avoid repetitive logs for nested fields, the middleware has to be refined to log only top-level operations 
// or filter out certain fields.
export const loggingMiddleware: IMiddlewareFunction = async (resolve, root, args, context, info: GraphQLResolveInfo) => {
  console.log(`GraphQL Operation: ${info.parentType.name}.${info.fieldName}`);
  console.log(`Arguments: ${JSON.stringify(args)}`);
  const result = await resolve(root, args, context, info);
  console.log(`Result: ${JSON.stringify(result)}`);
  return result;
};

export const loggingTopLevelMiddleware: IMiddlewareFunction = async (resolve, root, args, context, info: GraphQLResolveInfo) => {
    if (info.path.prev === undefined) {
      // Log only top-level operations
      console.log(`GraphQL Operation: ${info.parentType.name}.${info.fieldName}`);
      console.log(`Arguments: ${JSON.stringify(args)}`);
    }
    const result = await resolve(root, args, context, info);
    if (info.path.prev === undefined) {
      // Log only top-level operations
      console.log(`Result: ${JSON.stringify(result)}`);
    }
    return result;
};
