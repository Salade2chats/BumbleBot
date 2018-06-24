import * as colors from 'colors/safe';
import {ILogger, ITheme} from './interfaces';

export const LOGGER_LEVEL_EMERGENCY = 0; // system is unusable
export const LOGGER_LEVEL_ALERT = 1; // action must be taken immediately
export const LOGGER_LEVEL_CRITICAL = 2; // the system is in critical condition
export const LOGGER_LEVEL_ERROR = 3; // error condition
export const LOGGER_LEVEL_WARNING = 4; // warning condition
export const LOGGER_LEVEL_NOTICE = 5; // a normal but significant condition
export const LOGGER_LEVEL_INFO = 6; // a purely informational message
export const LOGGER_LEVEL_DEBUG = 7; // messages to debug an application

const defaultTheme: ITheme = {
  title: ['blue', 'bold', 'underline'],
  emergency: ['white', 'bgRed'],
  alert: ['red', 'bold'],
  critical: ['white', 'bgYellow'],
  error: ['red'],
  warning: ['yellow'],
  notice: ['magenta'],
  info: ['cyan'],
  debug: ['gray'],
};

export class Logger implements ILogger {

  private readonly level: number;

  private readonly theme: ITheme;

  constructor(level: number, theme: ITheme = null) {
    this.level = level;
    if (!theme) {
      this.theme = defaultTheme;
    }
    colors.setTheme(this.theme);
  }

  title(...args: any[]): void {
    if (this.level >= 0) {
      const messages: any[] = [];
      for (let i: number = 0, n: number = args.length; i < n; i++) {
        messages.push(colors['title'](args[i]));
      }
      console.log(...messages);
    }
  }

  emergency(...args: any[]): void {
    if (this.level >= LOGGER_LEVEL_EMERGENCY) {
      const messages: any[] = [];
      for (let i: number = 0, n: number = args.length; i < n; i++) {
        messages.push(colors['emergency'](args[i]));
      }
      console.log(...messages);
    }
  }

  alert(...args: any[]): void {
    if (this.level >= LOGGER_LEVEL_ALERT) {
      const messages: any[] = [];
      for (let i: number = 0, n: number = args.length; i < n; i++) {
        messages.push(colors['alert'](args[i]));
      }
      console.log(...messages);
    }
  }

  critical(...args: any[]): void {
    if (this.level >= LOGGER_LEVEL_CRITICAL) {
      const messages: any[] = [];
      for (let i: number = 0, n: number = args.length; i < n; i++) {
        messages.push(colors['critical'](args[i]));
      }
      console.log(...messages);
    }
  }

  error(...args: any[]): void {
    if (this.level >= LOGGER_LEVEL_ERROR) {
      const messages: any[] = [];
      for (let i: number = 0, n: number = args.length; i < n; i++) {
        messages.push(colors['error'](args[i]));
      }
      console.log(...messages);
    }
  }

  warning(...args: any[]): void {
    if (this.level >= LOGGER_LEVEL_WARNING) {
      const messages: any[] = [];
      for (let i: number = 0, n: number = args.length; i < n; i++) {
        messages.push(colors['warning'](args[i]));
      }
      console.log(...messages);
    }
  }

  notice(...args: any[]): void {
    if (this.level >= LOGGER_LEVEL_NOTICE) {
      const messages: any[] = [];
      for (let i: number = 0, n: number = args.length; i < n; i++) {
        messages.push(colors['notice'](args[i]));
      }
      console.log(...messages);
    }
  }

  info(...args: any[]): void {
    if (this.level >= LOGGER_LEVEL_INFO) {
      const messages: any[] = [];
      for (let i: number = 0, n: number = args.length; i < n; i++) {
        messages.push(colors['info'](args[i]));
      }
      console.log(...messages);
    }
  }

  debug(...args: any[]): void {
    if (this.level >= LOGGER_LEVEL_DEBUG) {
      const messages: any[] = [];
      for (let i: number = 0, n: number = args.length; i < n; i++) {
        messages.push(colors['debug'](args[i]));
      }
      console.log(...messages);
    }
  }
}

export default Logger;
