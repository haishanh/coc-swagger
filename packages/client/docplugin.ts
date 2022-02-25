import http from 'http';
import type { Socket } from 'net';
import connect from 'connect';
import textBody from 'body';
import yaml from 'yaml';
import { ViteDevServer } from 'vite';
import { WebSocketServer } from 'ws';

export const docplugin = () => {
  return {
    name: 'doc-plugin',
    configureServer(server: ViteDevServer) {
      return () => {
        const wss = new WebSocketServer({ noServer: true });

        server.httpServer.on('upgrade', (req, socket, head) => {
          if (req.headers['sec-websocket-protocol'] === 'coc-swagger') {
            wss.handleUpgrade(req, socket as Socket, head, (ws) => {
              wss.emit('connection', ws, req);
            });
          }
        });

        server.middlewares.use(
          (
            req: connect.IncomingMessage,
            res: http.ServerResponse,
            next: connect.NextFunction
          ) => {
            if (req.originalUrl === '/doc') {
              textBody(req, (_err, body) => {
                let cnt = {};
                try {
                  cnt = yaml.parse(body);
                } catch (err) {
                  throw new Error('Failed to parse API spec');
                }

                const clients = [];
                wss.clients.forEach((ws) => {
                  clients.push(ws);
                  ws.send(JSON.stringify(cnt));
                });

                // console.log(typeof cnt, cnt.tags);
                res.writeHead(200, { 'Content-Type': 'text/plain' });
                res.end('ok');
              });
              return;
            }
            next();
          }
        );
      };
    },
  };
};
