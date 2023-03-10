const httpStatus = require('http-status');
const { postService, tagService} = require('../../services');
const AppError = require('../../utils/AppError');
const catchError = require('../../utils/catchError');

const getPosts = catchError(async (req, res) => {
  const posts = await postService.getPosts();
  res.status(200).json({
    success: true,
    result: {
      posts,
    },
  });
});

const addPosts = catchError(async (req, res) => {
  const { user } = req;
  const { tagId } = req.body;
  const tag = await tagService.getTagById(tagId);
  const posts = await postService.addPosts(user, req.body);
  await tagService.addPostsTags(tag, posts);
  res.status(httpStatus.CREATED).json({
    success: true,
    result: {
      posts,
    },
  });
});

const getPostsById = catchError(async (req, res) => {
  const posts = await postService.getPostsById(req.params.id);
  if (!posts) {
    throw new AppError(httpStatus.NOT_FOUND, `id ${req.params.id} not found!`);
  }
  res.status(200).json({
    success: true,
    result: {
      posts,
    },
  });
});

module.exports = {
  getPosts,
  addPosts,
  getPostsById,
};
