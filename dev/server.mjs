import express from 'express';
const app = express();
const defaultPort = 3000;
import http from 'http';
import log from 'mk-log';
//const env = process.env.NODE_ENV;
//import envConfig from `./config/env/${env}.config.js`; 
import httpTerminator from 'http-terminator';
const { createHttpTerminator } = httpTerminator;

export default function Server(options = {}) {
 
  const config = { port: defaultPort  };

  Object.assign(config, options); 

  return new Promise( (resolve, reject) => {
    const app = express();
    const httpServer = http.createServer(app);
    const HttpTerminator = createHttpTerminator({ server: httpServer });

     
    const router = express.Router();

    router.route('/').get( (req, res) => {
      res.send('Hello World!');
    });

    // api paths should not be hardcoded
    // couldn't figure out dynamic import
    router.route('/api/public/beacons').get((req, res) => {
       res.send('waiting for access');
    }).post((req, res) => {
       res.status(200).send(req.body.data);
    });
    
    router.route('/api/public/errors').get((req, res) => {
       res.send('waiting for errors');
    }).post((req, res) => {
       res.status(200).send(req.body.data);
    });

    app.use('/', router);

    app.listen(config.port, () => {
      console.log(`Example app listening at http://localhost:${config.port}`);
      resolve({
        async stop() {
          try {
            await HttpTerminator.terminate();
          } catch (err) {
            log.info(err);
          }
        },
      });
    });
  });
}
