import express from 'express';
import { register, login, currentUser, forgotPassword, profileUpdate, findPeople, addFollower, userFollow, userFollowing, removeFollower, userUnfollow, searchUser, getuser, getUsers, setMessage } from '../controllers/auth';
import { requireSignIn } from '../middlewares';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/current-user', requireSignIn, currentUser);
router.post('/forgot-password', forgotPassword);

router.put('/profile-update', requireSignIn, profileUpdate);
router.get('/find-people', requireSignIn, findPeople);
router.put('/user-follow', requireSignIn, addFollower, userFollow);
router.get('/user-following', requireSignIn, userFollowing);
router.put('/user-unfollow', requireSignIn, removeFollower, userUnfollow);

router.get('/search-user/:query', searchUser);
router.get('/user/:username', getuser);

router.get('/users', requireSignIn, getUsers);
router.put('/set-message', requireSignIn, setMessage);

module.exports = router;