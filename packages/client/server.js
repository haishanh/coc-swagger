const path = require('path');
const config = require('./webpack.config');
const webpack = require('webpack');
const express = require('express');
const WebSocket = require('ws');
const http = require('http');
const bodyParser = require('body-parser');
const yaml = require('yaml');

const devMiddleware = require('webpack-dev-middleware');
const hotMiddleware = require('webpack-hot-middleware');

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

const { PORT } = process.env;
const port = PORT ? Number(PORT) : 3000;

config.entry.app.unshift('webpack-hot-middleware/client');
config.plugins.push(
  new webpack.HotModuleReplacementPlugin(),
  new webpack.NoEmitOnErrorsPlugin()
);

const compiler = webpack(config);
// webpack-dev-server config
const publicPath = config.output.publicPath;
const stats = {
  colors: true,
  version: false,
  modulesSort: 'issuer',
  assets: false,
  cached: false,
  cachedAssets: false,
  chunks: false,
  chunkModules: false,
};

const options = { publicPath, stats };

const wdm = devMiddleware(compiler, options);
const whm = hotMiddleware(compiler);
app.use(wdm);
app.use(whm);

app.get('/_dev', (_req, res) => {
  const outputPath = wdm.getFilenameFromUrl(options.publicPath || '/');
  const filesystem = wdm.fileSystem;
  const content = filesystem.readdirSync(outputPath);
  res.end(content.join('\n'));
});

app.use(bodyParser.raw({ type: 'text/yaml' }));
app.post('/doc', (req, res) => {
  const txt = req.body.toString();
  let cnt = {};
  try {
    cnt = yaml.parse(txt);
  } catch (err) {
    throw new Error('Failed to parse API spec');
  }
  const clients = [];
  wss.clients.forEach((ws) => {
    clients.push(ws);
    ws.send(JSON.stringify(cnt));
  });
  return res.json({ clients: clients.length });
});

app.use('*', (_req, res, next) => {
  const filename = path.join(compiler.outputPath, 'index.html');
  compiler.outputFileSystem.readFile(filename, (err, result) => {
    if (err) return next(err);

    res.set('content-type', 'text/html');
    res.send(result);
    res.end();
  });
});

const host = '0.0.0.0';

wss.on('connection', (ws) => {
  ws.on('message', (message) => {
    //log the received message and send it back to the client
    // console.log("received: %s", message);
    // eslint-disable-next-line no-console
    console.log(JSON.parse(message));
    // ws.send(`Hello, you sent -> ${message}`);
  });

  // ws.send('ack');
});

server.listen(port, host, () => {
  console.log(`>> Listening at http://${host}:${port}`);
});

wdm.waitUntilValid(() => {
  console.log(
    `
>> Build ready at:

  http://${host}:${port}
  http://127.0.0.1:${port}
  http://localhost:${port}
`
  );
});
