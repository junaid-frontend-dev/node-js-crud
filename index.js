const express = require('express');
const ytdl = require('ytdl-core');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const mongoose = require('mongoose');

const app = express();

app.use(bodyParser.json());
dotenv.config();

const PORT = process.env.PORT || 5000;
const MONGOURL = process.env.MONGO_URL;
const route = require('./routes/userRoute');

// app.get('/download', async (req, res) => {
//   try {
//     const url = req.query.url;
//     const videoId = await ytdl.getURLVideoID(url);
//     const metaInfo = await ytdl.getInfo(url);
//     let data = {
//       url: 'https://www.youtube.com/embed/' + videoId,
//       info: metaInfo.formats,
//     };
//     return res.send(data);
//   } catch (error) {
//     return res.status(500);
//   }
// });

mongoose
  .connect(MONGOURL)
  .then(() => {
    console.log('Database connected successful.');

    app.listen(PORT, () => {
      console.log(`Server Run on http://localhost:${PORT}`);
    });
  })
  .catch((error) => console.log(error));

app.use('/api/v1/users', route);
