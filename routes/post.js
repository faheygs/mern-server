import express from 'express';
import { createPost, uploadImage, postsByUser, userPost, updatePost, deletePost, newsFeed, likePost, unlikePost, addComment, removeComment, totalPosts, posts } from '../controllers/post';
import { requireSignIn, canEditDeletePost } from '../middlewares';
import formidable from 'express-formidable';

const router = express.Router();

router.post('/create-post', requireSignIn, createPost);
router.post('/upload-image', requireSignIn, formidable({ maxFileSize: 5 * 1024 * 1024 }), uploadImage);
router.get('/user-posts', requireSignIn, postsByUser);
router.get('/user-post/:_id', requireSignIn, userPost);
router.put('/update-post/:_id', requireSignIn, canEditDeletePost, updatePost);
router.delete('/delete-post/:_id', requireSignIn, canEditDeletePost, deletePost);

router.get('/news-feed/:page', requireSignIn, newsFeed);

router.put('/like-post', requireSignIn, likePost);
router.put('/unlike-post', requireSignIn, unlikePost);

router.put('/add-comment', requireSignIn, addComment);
router.put('/remove-comment', requireSignIn, removeComment);

router.get('/total-posts', totalPosts);

router.get('/posts', posts);

module.exports = router;