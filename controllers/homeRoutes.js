const router = require('express').Router();

const { Post, User, Comment } = require('../models');
// const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
    try {
        const postData = await Post.findAll({
            include: {
                model: User,
                attributes: ['name']
            }
        });

        const posts = postData.map((post) => post.get({ plain: true }));
        res.render('homepage', {
            posts
        });
    } catch (error) {
        res.status(500).json(err);
    }
});

router.get('/login', (req, res) => {
    if (req.session.logged_in) {
        res.redirect('/profile');
        return;
    }
});

module.exports = router;