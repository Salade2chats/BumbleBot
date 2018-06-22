import * as dotEnv from 'dotenv';
import * as http from 'http';
import * as util from 'util';
import {Facebook, Wit, Logger, DEBUG} from './services';
import {IContext, IContextCoordinates} from './services/wit';
import {inspect} from 'util';
import {Message} from './services/facebook/types';
import {IRequestMessage} from './services/facebook/interfaces';
import {GreetingIntent} from './services/wit/intents/greetingIntent';
import {FindImageIntent} from './services/wit/intents';
import {CustomSearch} from './services/google';
import AttachmentImage from './services/facebook/types/attachmentImage';

dotEnv.config();

const logger = new Logger(DEBUG);
const facebook = new Facebook(process.env.FB_TOKEN, process.env.FB_VERSION);
const googleImage = new CustomSearch(process.env.GOOGLE_APIKEY);
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
      facebook.write(thread, undefined, 'mark_seen', true)
        .then(data => {
          console.log('ACTION SUBMITTED', inspect(data, {depth: 5}));
        })
        .catch(error => {
          console.log('ACTION ERROR', inspect(error, {depth: 5}));
        });
      wit.message(messageText)
        .then(intents => {
          for (const intent of intents) {
            if (intent instanceof GreetingIntent) {
              facebook.write(thread, new Message('Bonjour !'), undefined, true)
                .then(data => {
                  console.log('MESSAGE SUBMITTED', inspect(data, {depth: 5}));
                })
                .catch(error => {
                  console.log('MESSAGE ERROR', inspect(error, {depth: 5}));
                });
            }
            if (intent instanceof FindImageIntent) {
              if (intent.missingFields().length > 0) {
                facebook.write(thread, new Message('Je dois chercher quelle image ?'), undefined, true)
                  .then(data => {
                    console.log('MESSAGE SUBMITTED', inspect(data, {depth: 5}));
                  })
                  .catch(error => {
                    console.log('MESSAGE ERROR', inspect(error, {depth: 5}));
                  });
              } else {
                facebook.write(thread, new Message('Go chercher une image de ' + intent.subject), undefined, true)
                  .then(data => {
                    console.log('MESSAGE SUBMITTED', inspect(data, {depth: 5}));
                    return googleImage.search(intent.subject, true);
                  })
                  .then(data => {
                    // @TODO: treat THEN
                    const image = new AttachmentImage(data.items[0].link);
                    facebook.write(thread, new Message(data.items[0].link, image), undefined, true);
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
    }).listen(9042);
    logger.info('Server started on port', 9042);

  })
  .catch(error => {
    logger.critical('CANNOT FIND BOT ID', util.inspect(error));
  });


