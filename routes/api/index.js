const express = require('express');
const authRoutes = require('./auth');
const postRoutes = require('./posts');
const tagRoutes = require('./tags');
const commentRoutes = require('./comments');

const router = express.Router();

router.get('/', (req, res) => {
  res.render('index', { title: 'Writing-Room-Article-API' });
});

router.use('/auth', authRoutes);
router.use('/posts', postRoutes);
router.use('/tags', tagRoutes);
router.use('/comments', commentRoutes);

module.exports = router;
