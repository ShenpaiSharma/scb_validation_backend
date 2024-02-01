const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express()

app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
app.use(express.json());

data = [
    {
        email: "admin@scb.com",
        password: '1234'
    },
    {
        email: "admin@diageo.com",
        password: 'rtyu'
    }
]

app.get('/', (req, res) => {
    res.json("Hello World")
})

app.post('/user', (req, res) => {
    const { username, password } = req.body;
    console.log('req', username, password)
    try {
        let found = false;
        for (let i = 0; i < data.length; i++) {
            if (data[i].email === username && data[i].password === password) {
                console.log('email', data[i]);
                found = true;
                return res.status(200).json('User found');
            }
        }
        if (!found) {
            return res.status(404).json('Email/password is incorrect');
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal Server Error' });
    }
})

app.listen(5000, () => console.log('Server is running on port 5000'));
