'use strict';

import http from 'http';
import express from 'express';

const app = express();
const server = http.createServer(app);

const main = async () => {
  app.use('/', (req, res) => {
    res.json({
      message: 'Hello'
    });
  });

  server.listen(8080, '0.0.0.0', () => {
    console.log('Server running');
  });
};

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
