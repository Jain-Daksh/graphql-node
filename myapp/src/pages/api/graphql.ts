import { ApolloServer } from "@apollo/server";
import { PrismaClient } from "@prisma/client";
import { prisma } from "../../../prisma/db";
import { startServerAndCreateNextHandler } from "@as-integrations/next";

export type Context = {
	prisma: PrismaClient;
};



const typeDefs = `#graphql
  type Query{
    hello: String
    novel(id: ID!): Novel 
    novels: [Novel]
  }

  type Novel {
    id: ID!
    title: String
    image: String
    createdAt: String
    updatedAt: String
    authors: [Author]
  }

  
    type Author {
    id: ID!
    name: String
    novelId: String
  }


`

const resolvers ={
  Query: {
    hello: () => "world",
    
    novel: async (_parent: any, args: any, context: Context) => {
			return await context.prisma.novel.findUnique({
				where: {
					id: args.id,
				},
			});
		},
		// get all novels
		novels: async (_parent: any, _args: any, context: Context) => {
			return await context.prisma.novel.findMany({
				// include: { author: true },
			});
		},  }
}
const server =new ApolloServer({
  resolvers, typeDefs
})

export default startServerAndCreateNextHandler(server)

// const apolloServer = new ApolloServer<Context>({ typeDefs, resolvers });

// export default startServerAndCreateNextHandler(apolloServer, {
// 	context: async (req, res) => ({ req, res, prisma }),
// });