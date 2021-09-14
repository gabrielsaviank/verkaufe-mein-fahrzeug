import {
  UseInterceptors,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { plainToClass } from 'class-transformer';

import { UserDto } from '../users/dtos/user.dto';

export class SerialiseInterceptor implements NestInterceptor {
  // Intercepts != extends
  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    // ACHTUNG! This runs something before a reques is handled by the request handler
    return next.handle().pipe(
      map((data: any) => {
        // run something before the response is sent out
        return plainToClass(UserDto, data, {
          excludeExtraneousValues: true,
        });
      }),
    );
  }
}
