/**
 * Simple logger, to log errors, warnings, success and info messages
 */
export const Logger = {
  /**
   * Logs an error message and exits the process
   * @param err The error message
   * @return {any} The process exit
   */
  error: (err: any): any => {
    const e = new Error(err);
    console.log('\x1b[31m%s\x1b[0m', '[Error] ', err, '\n', e.stack);
    return process.exit(0);
  },
  /**
   * Logs a warning message
   * @param {string} msg The warning message
   */
  warn: (msg: string) => {
    return console.log('\x1b[35m%s\x1b[0m', '[Warn] ', msg);
  },
  /**
   * Logs a success message
   * @param {string} msg The success message
   */
  success: (msg: string) => {
    return console.log('\x1b[32m%s\x1b[0m', '[Success] ', msg);
  },
  /**
   * Logs an info message
   * @param {string} msg The info message
   */
  info: (msg: string) => {
    return console.log('\x1b[33m%s\x1b[0m', '[Info] ', msg);
  },
};
