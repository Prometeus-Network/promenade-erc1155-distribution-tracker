require('dotenv').config()
const mongoose = require('mongoose')
const healthcheck = require('./healthcheck');

require('./models/erc1155contract')
require('./models/nftitems')
require('./models/erc1155holding')

const track1155Distribution = require('./services/track_dist_1155')

const uri = process.env.DB_URL

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
const db = mongoose.connection
db.on('error', console.error.bind(console, 'connection error:'))
db.once('open', async () => {
  console.log('nifty server has been connected to the db server')
  healthcheck();
  track1155Distribution()
})
