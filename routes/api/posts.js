const { Router } = require('express');
const { postControllers } = require('../../controllers/api');
const auth = require('../../middlewares/auth');

const router = Router();

router.route('/').get(postControllers.getPosts).post(auth(), postControllers.addPosts);

router.route('/:slug').get(postControllers.getPostsBySlug);

module.exports = router;
