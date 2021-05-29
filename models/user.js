const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    first_name: String,
    last_name: String,
    id: Number,
    email: String,
    phone: Number,
    date_of_birth: Date,
    company: {
        company_name: String,
        b_number: Number,
    },
    holdings: Number, 
    bank_account: [{
        bank_name: String,
        branch: Number,
        account: Number,
    }],
    password: Number,
    last_login: Date,
    token: String,  
});

module.exports = mongoose.model('User', userSchema);