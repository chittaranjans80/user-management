/**
 * Custom class for handling error message by extending the built-in Error class methods
 *
 * @export
 * @class HttpError
 * @typedef {HttpError}
 * @extends {Error}
 */
export default class HttpError extends Error {

  code: number;
  /**
   * Creates an instance of HttpError.
   * @constructor
   * @param {string} message
   * @param {number} errorCode
   */
  constructor(message: string, errorCode: number) {
    super(message);
    this.code = errorCode;
  }
}
