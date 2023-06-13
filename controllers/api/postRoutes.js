const router = require('express').Router();
const { Post } = require('../../models');

router.post('/', async (req, res) => {
    try {
        const newPost = await Post.create({
            ...req.body,
            user_id: req.session.user_id
        });

        res.status(200).json(newPost);
    } catch (error) {
        res.status(500).json(error.message);
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const postData = await Post.destroy({
            where: {
                id: req.params.id,
                user_id: req.session.user_id
            }
        });
        res.status(200).json(postData)
    } catch (error) {
        res.status(500).json(error.message);
    }
});

module.exports = router;