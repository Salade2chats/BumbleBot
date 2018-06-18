import * as dotEnv from 'dotenv';
import * as http from 'http';
import * as util from 'util';
import {Facebook, Wit, Logger, DEBUG} from './services';
import {IContext, IContextCoordinates} from './services/wit';

dotEnv.config();

const logger = new Logger(DEBUG);
const facebook = new Facebook(process.env.FB_TOKEN, process.env.FB_VERSION);
const wit = new Wit(process.env.WIT_TOKEN, process.env.WIT_VERSION, logger);
const witContext: IContext = {
  timezone: 'Europe/Paris',
  locale: 'fr_FR',
  coordinates: <IContextCoordinates>{
    lat: 48.873,
    long: 2.316
  }
};

// receive message
/*
const message: string = 'montre nous une image de chien qui court';
wit.message(message, witContext)
  .then(json => {
    logger.debug('SUCCESS', util.inspect(json, {depth: 50}));
  })
  .catch(function (err) {
    logger.warning('ERROR', util.inspect(err, {depth: 50}));
  });
*/

facebook.on('message', entry => {
  console.log('MESSAGE', entry);
});
http.createServer((req, res) => {
  if (req.method === 'POST') {
    let body = '';
    req.on('data', data => {
      body += data;
    });
    req.on('end', () => {
      logger.debug('Request received', body);
      facebook.analyseRequest(JSON.parse(body));
    });
  }
  res.write('Cheers!');
  res.end();
}).listen(process.env.PORT);
