import { ConvexError, v } from "convex/values";
import { paginationOptsValidator } from "convex/server";

import { mutation, query } from "./_generated/server";

export const create = mutation ({
    args: {title: v.optional(v.string()), initialContent: v.optional(v.string())},
    handler: async (ctx, args) => {
        const user = await ctx.auth.getUserIdentity();

        if (!user) {
            throw new ConvexError("Unauthorized");
        }

        const organizationId = (user.organization_id ?? undefined) as | string | undefined;       


        return await ctx.db.insert("documents", {
            title: args.title ?? "Untitled document",
            initialContent: args.initialContent,
            ownerId: user.subject,
            organizationId,
        })
    }
})

export const getDocuments = query({
  args: {
    paginationOpts: paginationOptsValidator,
    search: v.optional(v.string()),
  },
  handler: async (ctx, { search, paginationOpts }) => {
    const user = await ctx.auth.getUserIdentity();

    if (!user) {
      throw new ConvexError("Unauthorized");
    }

    const organizationId = (user.organization_id ?? undefined) as | string | undefined;

    if ( search && organizationId) {
      return await ctx.db
        .query("documents")
        .withSearchIndex("search_title", (q) => q.search("title", search).eq("organizationId", organizationId))
        .paginate(paginationOpts);
    }

    if (search) {
      return await ctx.db
        .query("documents")
        .withSearchIndex("search_title", (q) => 
          q.search("title", search).eq("ownerId", user.subject))
        .paginate(paginationOpts);
  }

    if (organizationId) {
      return await ctx.db
      .query("documents")
      .withIndex("by_organization_id", (q) => q.eq("organizationId", organizationId))
      .paginate(paginationOpts);
    }

    return await ctx.db
    .query("documents")
    .withIndex("by_owner_id", (q) => q.eq("ownerId", user.subject))
    .paginate(paginationOpts);
  },
});

export const removeById = mutation ({
  args: { id: v.id("documents") },
  handler: async (ctx, args) => {
    const user = await ctx.auth.getUserIdentity();
    if (!user) {
      throw new ConvexError("Unauthorized");
    }

    const document = await ctx.db.get(args.id);
    if (!document) {
      throw new ConvexError("Document not found");
    }

    const isOwner = document.ownerId === user.subject;
    const isOrganizationAdmin =
      user.organization_id === document.organizationId &&
      user.organization_role === "org:admin";

    console.log(`removing function: ${isOwner} and ${isOrganizationAdmin}`);

    if (isOwner || isOrganizationAdmin) {
      return await ctx.db.delete(args.id);
    }

    throw new ConvexError("Unauthorized");
  }
})


export const updateById = mutation ({
  args: { id: v.id("documents"), title: v.string() },
  handler: async (ctx, args) => {
    const user = await ctx.auth.getUserIdentity();
    if (!user) {
      throw new ConvexError("Unauthorized");
    }

    const document = await ctx.db.get(args.id);
    if (!document) {
      throw new ConvexError("Document not found");
    }

    const isOwner = document.ownerId === user.subject;
    const isOrganizationAdmin =
      user.organization_id === document.organizationId &&
      user.organization_role === "org:admin";

    console.log(`updating function: ${isOwner} and ${isOrganizationAdmin}`);

    if (isOwner || isOrganizationAdmin) {
      return await ctx.db.patch(args.id, { title: args.title });
    }

    throw new ConvexError("Unauthorized");
  }
})

