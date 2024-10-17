"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Custom class for handling error message by extending the built-in Error class methods
 *
 * @export
 * @class HttpError
 * @typedef {HttpError}
 * @extends {Error}
 */
class HttpError extends Error {
    /**
     * Creates an instance of HttpError.
     * @constructor
     * @param {string} message
     * @param {number} errorCode
     */
    constructor(message, errorCode) {
        super(message);
        this.code = errorCode;
    }
}
exports.default = HttpError;
