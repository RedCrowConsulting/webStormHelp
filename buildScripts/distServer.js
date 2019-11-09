import express from 'express';
import path from 'path';
import open from 'open';
import compression from 'compression';

/* eslint-disable no-console */

const port = 3000;
const app = express();

app.use(compression()); // gzip compression so we can see production file sizes
app.use(express.static('dist'));

app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, '../dist/index.html'));
});

// Hard coding for simplicity.
// see baseUrl.js
// announce running from distServer 'production served locally' using seed data

app.get('/news', function(req, res) {
  res.json([
    {
      id: 0,
      articleIconShortCode: `i`,
      articleTitle: `Hello`,
      articleBody: `The package.json says this is webStormHelp v${require(
          '../package.json').version}`,
    },
    {
      id: 1,
      articleIconShortCode: `i`,
      articleTitle: `Built`,
      articleBody: `The production distServer is running with seed data only.
        A browser refresh will reset your data.`,
    },
    {
      id: 2,
      articleIconShortCode: `n`,
      articleTitle: `Release Notes`,
      articleBody: `This is early. Keep going!`,
    },
    {
      id: 3,
      articleIconShortCode: `b`,
      articleTitle: `Current Issue`,
      articleBody: `We know about issue x; try y while we fix it. Thanks.`,
    },
  ]);
});

app.listen(port, function(err) {
  if (err) {
    console.log(err);
  } else {
    open('http://localhost:' + port);
  }
});
