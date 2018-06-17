import * as colors from 'colors/safe';

export const EMERGENCY = 0; // system is unusable
export const ALERT = 1; // action must be taken immediately
export const CRITICAL = 2; // the system is in critical condition
export const ERROR = 3; // error condition
export const WARNING = 4; // warning condition
export const NOTICE = 5; // a normal but significant condition
export const INFO = 6; // a purely informational message
export const DEBUG = 7; // messages to debug an application

export interface ITheme {
  title: string|string[];
  emergency: string|string[];
  alert: string|string[];
  critical: string|string[];
  error: string|string[];
  warning: string|string[];
  notice: string|string[];
  info: string|string[];
  debug: string|string[];
}

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

export class Logger {

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
    if (this.level >= EMERGENCY) {
      const messages: any[] = [];
      for (let i: number = 0, n: number = args.length; i < n; i++) {
        messages.push(colors['emergency'](args[i]));
      }
      console.log(...messages);
    }
  }

  alert(...args: any[]): void {
    if (this.level >= ALERT) {
      const messages: any[] = [];
      for (let i: number = 0, n: number = args.length; i < n; i++) {
        messages.push(colors['alert'](args[i]));
      }
      console.log(...messages);
    }
  }

  critical(...args: any[]): void {
    if (this.level >= CRITICAL) {
      const messages: any[] = [];
      for (let i: number = 0, n: number = args.length; i < n; i++) {
        messages.push(colors['critical'](args[i]));
      }
      console.log(...messages);
    }
  }

  error(...args: any[]): void {
    if (this.level >= ERROR) {
      const messages: any[] = [];
      for (let i: number = 0, n: number = args.length; i < n; i++) {
        messages.push(colors['error'](args[i]));
      }
      console.log(...messages);
    }
  }

  warning(...args: any[]): void {
    if (this.level >= WARNING) {
      const messages: any[] = [];
      for (let i: number = 0, n: number = args.length; i < n; i++) {
        messages.push(colors['warning'](args[i]));
      }
      console.log(...messages);
    }
  }

  notice(...args: any[]): void {
    if (this.level >= NOTICE) {
      const messages: any[] = [];
      for (let i: number = 0, n: number = args.length; i < n; i++) {
        messages.push(colors['notice'](args[i]));
      }
      console.log(...messages);
    }
  }

  info(...args: any[]): void {
    if (this.level >= INFO) {
      const messages: any[] = [];
      for (let i: number = 0, n: number = args.length; i < n; i++) {
        messages.push(colors['info'](args[i]));
      }
      console.log(...messages);
    }
  }

  debug(...args: any[]): void {
    if (this.level >= DEBUG) {
      const messages: any[] = [];
      for (let i: number = 0, n: number = args.length; i < n; i++) {
        messages.push(colors['debug'](args[i]));
      }
      console.log(...messages);
    }
  }
}

export default Logger;
