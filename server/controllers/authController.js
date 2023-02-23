const { register, login } = require('../services/userService');
const jwtDecode = require('jwt-decode');

const router = require('express').Router();


//Authentification routes
router.post('/register', async (req, res) => {
    const { username, email, password } = req.body;
    try {
        const user = await register(username, email, password);
        res.status(201).json(user)
    } catch (error) {
        console.log(error)
        res.status(400).json({error:error.message})
    }
    res.end()
})
router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await login(email, password)
        res.status(201).json(user)
    } catch (error) {
        res.status(400).json({error:error.message})
    }
})
router.get('/logout', (req, res) => {
    
    res.status(204).end();
});


router.post('/profile', (req, res) => {
    const data = req.body;
    const token = jwtDecode(data.token);
    try {
        const username = token.username;
        const email = token.email;
        const password = token.password;
   
        res.status(200).json({"username": username, "email": email, "password": password});
        res.end();
    } catch (error) {
        console.log(error);
    }
})
module.exports = router;