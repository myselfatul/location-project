// timing.middleware.ts
import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class TimingMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const start = process.hrtime();

    res.on('finish', () => {
        const end = process.hrtime(start);
        const elapsedTime = end[0] * 1e9 + end[1];

      // Add the elapsed time to the response body
      res.locals.elapsedTime = elapsedTime;
      
    });

    next();
  }
}
