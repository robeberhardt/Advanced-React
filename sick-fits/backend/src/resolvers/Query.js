const { forwardTo } = require("prisma-binding");
const axios = require("axios");
const { hasPermission } = require("../utils");

const Query = {
  // async items(parent, args, ctx, info) {
  //   const items = await ctx.db.query.items();
  //   return items;
  // }
  items: forwardTo("db"),
  item: forwardTo("db"),
  itemsConnection: forwardTo("db"),

  async users(parent, args, ctx, info) {
    // 1. are they logged in?
    if (!ctx.request.userId) {
      throw new Error(`You must be logged in.`);
    }
    // 2. does user have permission to query users?
    hasPermission(ctx.request.user, ["ADMIN", "PERMISSIONUPDATE"]);
    // 3. if so, query them!
    return ctx.db.query.users({}, info);
  },

  me(parent, args, ctx, info) {
    // check if there is a current userId
    if (!ctx.request.userId) {
      return null;
    }
    return ctx.db.query.user(
      {
        where: { id: ctx.request.userId }
      },
      info
    );
  },

  async cloudImages(parent, args, ctx, info) {
    const response = await axios.get(
      `${process.env.CLOUDINARY_BASE_URL}/resources/image`,
      {
        auth: {
          username: process.env.CLOUDINARY_KEY,
          password: process.env.CLOUDINARY_SECRET
        }
      }
    );
    return response.data.resources;
  }
};

module.exports = Query;
