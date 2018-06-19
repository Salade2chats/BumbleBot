import * as dotEnv from 'dotenv';
import * as http from 'http';
import * as util from 'util';
import {Facebook, Wit, Logger, DEBUG} from './services';
import {IContext, IContextCoordinates} from './services/wit';
import {inspect} from 'util';
import {Message} from './services/facebook/types/message';
import {IRequestMessage} from './services/facebook/interfaces';

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

facebook.on('message', (requestMessage: IRequestMessage) => {
  logger.info('requestMessage received', inspect(requestMessage, {depth: 5}));
  if (requestMessage.forMe() || requestMessage.aboutMe()) {
    logger.info('requestMessage addressed to the Bot or about the Bot');
    const thread = requestMessage.fromThread();
    const messageText = requestMessage.messageText();
    if (thread) {
      wit.message(messageText)
        .then(intents => {
          for (const intent of intents) {
            if (<string>typeof intent === 'GreetingIntent') {
              facebook.write(new Message('Bonjour !'), thread, true)
                .then(data => {
                  console.log('MESSAGE SUBMITTED', inspect(data, {depth: 5}));
                })
                .catch(error => {
                  console.log('MESSAGE ERROR', inspect(error, {depth: 5}));
                });
            }
            if (<string>typeof intent === 'FindImageIntent') {
              if (intent.missingFields().length > 0) {
                facebook.write(new Message('Je dois chercher quelle image ?'), thread, true)
                  .then(data => {
                    console.log('MESSAGE SUBMITTED', inspect(data, {depth: 5}));
                  })
                  .catch(error => {
                    console.log('MESSAGE ERROR', inspect(error, {depth: 5}));
                  });
              } else {
                facebook.write(new Message('Go chercher une image de ' + intent.subject), thread, true)
                  .then(data => {
                    console.log('MESSAGE SUBMITTED', inspect(data, {depth: 5}));
                  })
                  .catch(error => {
                    console.log('MESSAGE ERROR', inspect(error, {depth: 5}));
                  });
              }
            }
          }
        })
        .catch(error => {
          logger.warning('Error when Wit message text:', inspect(error, {depth: 5}));
        });
    }
/*
    if (thread) {
      logger.info('requestMessage addressed from a thread');
      const message = new Message('Bien reçu !');
      facebook.write(message, thread, true)
        .then(data => {
          console.log('MESSAGE SUBMITTED', inspect(data, {depth: 5}));
        })
        .catch(error => {
          console.log('MESSAGE ERROR', inspect(error, {depth: 5}));
        });
    }
*/
  }
});

facebook.me()
  .then(me => {
    logger.info('Bot ID found', me.id);
    process.env.BOT_ID = me.id;
    logger.info('Bot name found', me.name);
    process.env.BOT_NAME = me.name;

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
    logger.info('Server started on port', process.env.PORT);

  })
  .catch(error => {
    logger.critical('CANNOT FIND BOT ID', util.inspect(error));
  });


