
const { addPostsTags } = require('./tags');
const Model = require('../database/models');

const { posts, users, posts_categories, tags, comments } = Model.sequelize.models;

const getPosts = async () => {
  const post = await posts.findAll({
    include: [
      {
        model: users,
        as: 'users',
        attributes: ['id', 'userName'],
      },
    ],
  });
  return post;
};

const addPosts = async (user, payload) => {
  const { id } = user;
  const { title, slug, short_desc, content } = payload;
  const post = await posts.create({ userId: id, title, slug, short_desc, content });
  return post;
};

const getPostsById = async (id) => {
  const post = await posts.findOne({
    where: { id },
    include: [
      {
        model: users,
        as: 'users',
        attributes: ['id', 'userName'],
      },
      {
        model: tags,
        as: 'tags',
        through: {
          attributes: [],
        },
      },
    ],
  });
  return post;
};

module.exports = {
  getPosts,
  addPosts,
  getPostsById,
};
