import { v } from "convex/values";
import { paginationOptsValidator } from "convex/server";

import { mutation, query } from "./_generated/server";

export const create = mutation ({
    args: {title: v.optional(v.string()), initialContent: v.optional(v.string())},
    handler: async (ctx, args) => {
        const user = await ctx.auth.getUserIdentity();

        if (!user) {
            throw new Error("Unauthorized");
        }

        return await ctx.db.insert("documents", {
            title: args.title ?? "Untitled document",
            initialContent: args.initialContent,
            ownerId: user.subject,
        })
    }
})

export const getDocuments = query({
  args: {
    paginationOpts: paginationOptsValidator,
  },
  handler: async (ctx, args) => {
    return await ctx.db.query("documents").paginate(args.paginationOpts);
  },
});