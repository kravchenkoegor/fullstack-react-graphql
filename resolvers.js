const { EmailAddressResolver } = require('graphql-scalars');

module.exports = {
  Email: EmailAddressResolver,
  Query: {
    user: async (_, { id }, { User }) => {
      try {
        const user = await User.findOne({ id });
        return user;
      } catch (error) {
        res.status(500).json({ error });
      }
    },
    users: async (_, args, { User }) => {
      try {
        const { skip, limit } = args;
        const users = await User.find({}).skip(skip).limit(limit);
        return users;
      } catch (error) {
        res.status(500).json({ error });
      }
    },
    count: async (_, args, { User }) => {
      const count = await User.countDocuments({});
      return count;
    }
  },
  Mutation: {
    async createUser(_, { input }, { User }) {
      try {
        const user = await new User(input).save();
        return user;
      } catch (error) {
        res.status(500).json({ error });
      }
    },
    async updateUser(_, { id, input }, { User }) {
      try {
        const $set = {};
        Object.keys(input).forEach(k => {
          if (Boolean(input[k])) {
            $set[k] = input[k];
          }
        });

        const updatedUser = await User.findOneAndUpdate(
          { id },
          { $set },
          { new: true }
        );
        return updatedUser;
      } catch (error) {
        res.status(500).json({ error });
      }
    },
    async deleteUser(_, { id }, { User }) {
      try {
        return await User.findOneAndRemove({ id });
      } catch (error) {
        res.status(500).json({ error });
      }
    }
  }
};
