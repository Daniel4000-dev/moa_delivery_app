const router = require('express').Router()

router.get('/', (req, res) => {
    return res.send('Inside the user router');
})

module.exports = router