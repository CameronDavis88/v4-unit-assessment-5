bcrypt= require('bcryptjs')

module.exports = {
    register: async (req, res) => {

        const { username, password, profile_pic } = req.body;
        const db = req.app.get('db');

        const foundUser = await db.find_user_by_username({ username });
        if (foundUser[0]) {
            return res.status(400).send('Username already in use');
        }

        let salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(password, salt);

        const newUser = await db.user.create_user({ username, hash, profile_pic });

        req.session.user = newUser[0];
        res.status(201).send(req.session.user);
    },

    login: async (req, res) => {
        const { username, password } = req.body;
        const db = req.app.get('db');

        const foundUser = await db.user.find_user_by_username({ username });
        if (!foundUser[0]) {
            return res.status(404).send('Username not found')
        }

        const authenticated = bcrypt.compareSync(password, foundUser[0].password);
        if (!authenticated) {
            return res.status(401).send('Password is incorrect')
        }

        delete foundUser[0].password;

        req.session.user = foundUser[0];
        res.status(202).send(req.session.user);
    },

    logout: (req, res) => {
        const {id} = req.params
        req.session.destroy({id});
        res.sendStatus(200);
    },

    getUser: async (req, res) => {
        if(!req.session && !req.session.user) return res.sendStatus(401)
        const db = req.app.get('db');
        const { username } = db.user
        const getUser = await db.user.getUser({ username })

        if (!getUser) 
            return res.status(404).send('Not logged in')
        
         res.status(401).send(getUser)
        
    }
}
// I am not sure if my getUser checks for if its on a session right or not!
