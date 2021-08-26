const monk = require('monk')

const DB_URL = 'cluster0.s56mj.gcp.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'
const { NODE_MONGO_USER, NODE_MONGO_PASS } = process.env;

const db = monk(`mongodb+srv://${NODE_MONGO_USER}:${NODE_MONGO_PASS}@${DB_URL}`)
// const db = monk('mongodb://localhost:27017')

db.then(() => console.log('Connected correctly'))
module.exports = db
