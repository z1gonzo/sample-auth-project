const monk = require('monk')

const { NODE_MONGO_USER, NODE_MONGO_PASS, NODE_MONGO_URL } = process.env;

const db = monk(`mongodb+srv://${NODE_MONGO_USER}:${NODE_MONGO_PASS}@${NODE_MONGO_URL}`)

db.then(() => console.log('Connected correctly')).catch(err => console.log('Ups something went wrong...', err));
module.exports = db
