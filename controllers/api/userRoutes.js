const router = require('express').Router();
const { User } = require('../../models');

router.post('/', async (req, res) => {
    try {
        const userData = await User.create(req.body);

        req.session.save(() => {
            req.session.user_id = userData.id;
            req.session.logged_in = true;
        })

        res.status(200).json(userData);
    } catch (error) {
        res.status(500).json(error.message);
    }
});

router.post('/login', async(req, res) => {
    try {
        const userData = await User.findOne({
            where: {
                email: req.body.email
            }
        })
    } catch (error) {
        
    }
})

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