const { EmailAddressResolver } = require('graphql-scalars');

const handleError = error => {
  if (error.code === 11000 || error.codeName === 'DuplicateKey') {
    throw new Error('Duplicate key');
  } else {
    throw new Error(error);
  }
};

module.exports = {
  Email: EmailAddressResolver,
  Query: {
    user: async (_, { id }, { User }) => {
      try {
        const user = await User.findOne({ id });
        return user;
      } catch (error) {
        handleError(error);
      }
    },
    users: async (_, args, { User }) => {
      try {
        const { skip, limit } = args;
        const users = await User.find({}).skip(skip).limit(limit);
        return users;
      } catch (error) {
        handleError(error);
      }
    },
    count: async (_, args, { User }) => {
      try {
        return await User.countDocuments({});
      } catch (error) {
        handleError(error);
      }
    }
  },
  Mutation: {
    async createUser(_, { input }, { User }) {
      try {
        const user = await new User(input).save();
        return user;
      } catch (error) {
        handleError(error);
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
        handleError(error);
      }
    },
    async deleteUser(_, { id }, { User }) {
      try {
        return await User.findOneAndRemove({ id });
      } catch (error) {
        handleError(error);
      }
    }
  }
};
