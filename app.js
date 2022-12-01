const express = require('express')
const bodyParser = require('body-parser')
const dotenv = require('dotenv');
const cors = require('cors');
dotenv.config();

const app = express()
const port = 3000

const db = require("./models");
db.sequelize.sync()
.then(() => {
  console.log("Synced db.");
})
.catch((err) => {
  console.log("Failed to sync db: " + err.message);
});

app.use(cors({
    origin: '*'
}))

app.use(bodyParser.json({limit: '5mb'}))
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)

app.get('/', (req, res) => {
  res.json({ info: 'This is a ks2 newspaper' })
})

// Routes
require("./routes/article.routes")(app);

app.listen(port, () => {
  console.log(`App running on port ${port}.`)
})
