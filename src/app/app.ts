import * as dotEnv from 'dotenv';
import * as http from 'http';
import * as util from 'util';
import {
  DependencyInjector,
  Facebook,
  FindImageIntent,
  GoogleClient,
  GreetingIntent,
  IDependencyInjector,
  IFacebookRecipient,
  ILogger,
  IRequestMessage,
  IWitContext,
  IWitContextCoordinates,
  Logger,
  LOGGER_LEVEL_DEBUG,
  Wit
} from '../services';
import {FindImageIntentEvents, GreetingIntentEvents} from './events';

const DI: IDependencyInjector = DependencyInjector.getInstance();
DI.register('logger', new Logger(LOGGER_LEVEL_DEBUG));
DI.register('facebook', new Facebook(process.env.FB_TOKEN, process.env.FB_VERSION, <ILogger> DI.get('logger')));
DI.register('wit', new Wit(process.env.WIT_TOKEN, process.env.WIT_VERSION, <ILogger> DI.get('logger')));
DI.register('google', new GoogleClient(process.env.GOOGLE_APIKEY, <ILogger> DI.get('logger')));
dotEnv.config();

DI.share('defaultWitContext', <IWitContext> {
  timezone: 'Europe/Paris',
  locale: 'fr_FR',
  coordinates: <IWitContextCoordinates>{
    lat: 48.873,
    long: 2.316
  }
});

export class App {
  private logger: Logger = DI.get('logger');
  private facebook: Facebook = DI.get('facebook');
  private wit: Wit = DI.get('wit');
  private google: GoogleClient = DI.get('google');

  registerWitEvents() {
    this.wit.on('GreetingIntent', (intent: GreetingIntent, sharedData: any) => {
      (new GreetingIntentEvents(intent, sharedData)).trigger();
    });
    this.wit.on('FindImageIntent', (intent: FindImageIntent, sharedData: any) => {
      (new FindImageIntentEvents(intent, sharedData)).trigger();
    });
  }

  registerFacebookEvents() {
    this.facebook.on('message', (requestMessage: IRequestMessage) => {
      const recipient: IFacebookRecipient = requestMessage.answerRecipient();
      this.facebook.write(recipient, undefined, 'mark_seen')
        .then(data => {
          this.logger.debug('Message marks as seen', util.inspect(data, {depth: 5}));
        })
        .catch(error => {
          this.logger.error('Error when marking message as seen', util.inspect(error, {depth: 5}));
        });
      if (requestMessage.forMe() || requestMessage.aboutMe()) {
        this.logger.info('requestMessage addressed to the Bot or about the Bot');
        const thread = requestMessage.fromThread();
        const messageText = requestMessage.messageText();

        this.wit.message(
          messageText,
          DI.get('defaultWitContext'),
          undefined,
          undefined,
          {requestMessage: requestMessage}
        ).catch(error => {
          this.logger.warning('Error when Wit message text:', util.inspect(error, {depth: 5}));
        });
      }
    });
  }

  init(): Promise<void> {
    return this.facebook.me()
      .then(me => {
        this.logger.info('Bot ID found', me.id);
        process.env.BOT_ID = me.id;
        this.logger.info('Bot name found', me.name);
        process.env.BOT_NAME = me.name;
        return Promise.resolve();
      });
  }

  start() {
    this.init()
      .then(() => {
        this.registerWitEvents();
        this.registerFacebookEvents();
        http.createServer((req, res) => {
          if (req.method === 'POST') {
            let body = '';
            req.on('data', data => {
              body += data;
            });
            req.on('end', () => {
              this.logger.debug('Request received', body);
              this.facebook.analyseRequest(JSON.parse(body));
            });
          }
          res.write('Cheers!');
          res.end();
        }).listen(9042);
        this.logger.info('Server started on port', 9042);
      })
      .catch(error => {
        this.logger.critical('Cannot start server', util.inspect(error));
      });
  }
}
