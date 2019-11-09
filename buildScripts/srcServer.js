import express from 'express';
import path from 'path';
import open from 'open';
import webpack from 'webpack';
import config from '../webpack.config.dev';

/* eslint-disable no-console */

const port = 3000;
const app = express();
const compiler = webpack(config);

app.use(require('webpack-dev-middleware')(compiler, {
  noInfo: true,
  publicPath: config.output.publicPath,
}));

app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, '../src/index.html'));
});

// Hard coding for simplicity.
// see baseUrl.js
// announce running from srcServer 'development' using seed data
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
      articleTitle: `Started`,
      articleBody: `The development srcServer is running with seed data only.
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

app.listen(port, (err) => {
  if (err) {
    console.log(err);
  } else {
    open('http://localhost:' + port);
  }
});
