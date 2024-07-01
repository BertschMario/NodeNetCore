export abstract class ServerError extends Error {
  public code = 500;
}

/**
 * @class InternalServerError
 * @code 500
 */
export class InternalServerError extends ServerError {
  public override code = 500;
}

/**
 * @class BadRequestError
 * @code 400
 */
export class BadRequestError extends ServerError {
  public override code = 400;
}

/**
 * @class UnauthorizedError
 * @code 401
 */
export class UnauthorizedError extends ServerError {
  public override code = 401;
}

/**
 * @class ForbiddenError
 * @code 403
 */
export class ForbiddenError extends ServerError {
  public override code = 403;
}

/**
 * @class NotFoundError
 * @code 404
 */
export class NotFoundError extends ServerError {
  public override code = 404;
}

/**
 * @class MethodNotAllowedError
 * @code 405
 */
export class MethodNotAllowedError extends ServerError {
  public override code = 405;
}
