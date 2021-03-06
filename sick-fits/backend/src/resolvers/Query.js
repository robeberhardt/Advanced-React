const { forwardTo } = require("prisma-binding");
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
  }
};

module.exports = Query;
