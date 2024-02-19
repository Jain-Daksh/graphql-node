import { Context } from "@/pages/api/graphql";

export const resolvers = {
	Query: {
		//get novel by id
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
				include: { author: true },
			});
		},
	},
	// nested resolve function to get auhtors in novels
	Novel: {
		authors: async (parent: any, _args: any, context: Context) => {
			return await context.prisma.author.findMany({
				where: {
					novelId: parent.id,
				},
			});
		},
	},
	

  /// mutations


  Mutation:{
    addNovel: async(parent:any, args:any, context:Context) => {
      return await context.prisma.novel.create({
        data:{
          title: args.title,
          image: args.image,
          
        }
      })
    }
  }
};