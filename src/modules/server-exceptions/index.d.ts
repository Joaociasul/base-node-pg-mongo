import { NextFunction, Request, Response } from "express";

export declare enum StatusCodes {
  NOT_FOUND = 404,
  SERVER_ERROR = 500,
  UNPROCESSABLE_ENTITY = 422,
  BAD_REQUEST = 400,
  HTTP_OK = 200,
  HTTP_CREATED = 201,
}

export declare interface MessageValidator {
  readonly [fieldName: string]: string;
}

export declare interface ExceptionError {
  readonly stack: unknown;
  readonly msg: string;
}

export declare class ValidatorException {
  readonly message: string;
  readonly statusCode: number;
  readonly validator: Array<MessageValidator>;
  readonly error: boolean;
  readonly status: string;
  readonly data: null;
  constructor(validator: Array<MessageValidator>, message: string);
}

export declare class BadRequestException {
  readonly message: string;
  readonly statusCode: StatusCodes;
  readonly status: string;
  readonly error: boolean;
  readonly data: unknown;
  constructor(message: string);
}

export declare class NotFoundException {
  readonly message: string;
  readonly statusCode: StatusCodes;
  readonly status: string;
  readonly error: boolean;
  readonly data: unknown;
  constructor(message: string);
}

export declare class ServerErrorException {
  readonly message: string;
  readonly statusCode: StatusCodes;
  readonly status: string;
  readonly error: boolean;
  readonly data: unknown;
  readonly exception: ExceptionError;
  constructor(message: string, error: Error);
}

export declare function exceptionsHandler(
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
): any;
