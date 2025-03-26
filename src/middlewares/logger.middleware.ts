import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  constructor(private readonly logger: Logger) {}

  use(req: Request, res: Response, next: NextFunction) {
    const { method, originalUrl: url } = req;
    const reqTime = Date.now();

    this.logger.log(`${method} ${url} - Request Recived `);

    res.on('finish', () => {
      const resTime = Date.now();
      const { statusCode } = res;
      this.logger.log(
        `${method} ${url} ${statusCode} - ${resTime - reqTime} ms - Response Sent`,
      );
    });

    next();
  }
}
