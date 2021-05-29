const express = require('express');
const app = express();
var bodyParser = require('body-parser')

const User = require('./models/user')

const mongoose = require('mongoose')
const url = 'mongodb://127.0.0.1:27017/btb-users'

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
var jsonParser = bodyParser.json()

app.get('/login', async (req, res) => {
    const {email, password} = req.query;
    console.log(email,password)
    const userData = await User.findOne({email: email, password: password})
    console.log('userData',userData)
    if(userData === null) {
        res.statusCode = 401;
        res.send('user or password incorrect');
    } else {
        const token = Date.now()
        userData.token = token;
        await User.updateOne({id:userData.id}, { $set: {last_login:token, token: token}})
        res.send({userData})
    }
});

app.put('/details', jsonParser,  async (req, res) => {
    const userData = req.body;
    console.log(userData);
})



// app.get('/yeah', (req, res) => res.json(req.query));
// app.get('/cook', (req, res) => res.cookie('username', 'Roi'));
app.listen(3000, () => console.log('Server ready'));

const db = mongoose.connection
db.once('open', _ => {
  console.log('Database connected:', url)
})

db.on('error', err => {
  console.error('connection error:', err)
})

const a = new User ({
    first_name: 'א',
    last_name: 'ישראלי',
    id: 11111111,
    email: "1@test.com",
    phone: 11111111,
    date_of_birth: new Date('1990-12-17'),
    company: {
        company_name: "aCompany",
        business_number: 11111111,
    },
    holdings: 50, 
    bank_account: [{
        bank_name: "haPoalim",
        branch: 678,
        account: 90976557,
    }],
    password: 11111111,  
    last_login: new Date('2019-12-17'),
  })

//   a.save(function (error, document) {
//     if (error) console.error(error)
//     console.log(document)
//   })

