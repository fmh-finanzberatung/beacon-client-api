import tape from 'tape';
import log from 'mk-log';
import Server from '../dev/server.mjs';
import axios from 'axios';
const port = 3006;
import envConfig from '../config/env/test.config.js';

async function main() {
  await tape(async (t) => {
    try {
    const server = await Server({port});


    log.info('server', server);


    const result = await axios.get(`${envConfig.apiHost}${envConfig.apiErrorLogUri}`); 
    log.info('axios result', result.data);
    console.log('server running', server);

    await server.stop();
    } catch (err) {
      log.error(err);
    } finally {
      t.end();
    }
  });
}

main();
