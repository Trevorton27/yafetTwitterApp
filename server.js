const express = require('express');
const path = require('path');
const axios = require('axios');
require('dotenv').config();
const PORT = process.env.PORT || 3000;
const token = process.env.TOKEN;

const app = express();

// app.get("/api/tweets", (req, res) => {
//   axios
//     .get(`https://api.twitter.com/1.1/search/tweets.json?q=tesla`, {
//       headers: {
//         Authorization: ` Bearer ${token}`,
//       },
//     })
//     .then((response) => {
//       res.send(response.data);
//     })
//     .catch((error) => {
//       console.log(error);
//     });
// });

app.get('api/search', async (req, res) => {
  const searchText = req.query.text;
  console.log('get a data', req);
  try {
    const response = await axios.get(
      `https://api.twitter.com/1.1/search/tweets.json?q=${searchText}`,
      {
        headers: {
          Authorization: ` Bearer ${token}`
        }
      }
    );
    console.log(response.data);
    res.send(response.data);
  } catch (error) {
    res.sendStatus(500);
    console.log(error);
  }
});

// Favorites
app.get('/favorite/nba', async (req, res) => {
  await axios
    .get(`https://api.twitter.com/1.1/search/tweets.json?q=nba`, {
      headers: {
        Authorization: ` Bearer ${token}`
      }
    })
    .then((response) => {
      res.send(response.data);
    })
    .catch((error) => console.log(error));
});

app.get('/favorite/nasa', async (req, res) => {
  await axios
    .get(`https://api.twitter.com/1.1/search/tweets.json?q=nasa`, {
      headers: {
        Authorization: ` Bearer ${token}`
      }
    })
    .then((response) => {
      res.send(response.data);
    })
    .catch((error) => console.log(error));
});
app.use(express.static(path.join(__dirname, 'client', 'build')));
//
app.listen(PORT, () => console.log(`Server on port ${PORT} `));
//
