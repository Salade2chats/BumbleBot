import * as dotEnv from 'dotenv';
import * as http from 'http';
import {Facebook, Wit, Logger, DEBUG} from './services';

dotEnv.config();
console.log(process.env.WIT_TOKEN);
let facebook = new Facebook(process.env.FB_TOKEN, process.env.FB_VERSION);
let wit = new Wit(process.env.WIT_TOKEN, process.env.WIT_VERSION);
let logger = new Logger(DEBUG);

http.createServer((req, res) => {
  if (req.method === 'POST') {
    let body = '';
    req.on('data', data => {
      body += data;
    });
    req.on('end', () => {
      logger.debug('Request received', body);
    });
  }
  res.write('Cheers!');
  res.end();
}).listen(process.env.PORT);
