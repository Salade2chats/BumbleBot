export interface ILogger {
  title(...args: any[]): void;

  emergency(...args: any[]): void;

  alert(...args: any[]): void;

  critical(...args: any[]): void;

  error(...args: any[]): void;

  warning(...args: any[]): void;

  notice(...args: any[]): void;

  info(...args: any[]): void;

  debug(...args: any[]): void;
}

export default ILogger;
