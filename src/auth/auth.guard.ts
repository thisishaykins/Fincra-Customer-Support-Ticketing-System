import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Reflector } from '@nestjs/core';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const requiresAuth = this.reflector.getAllAndOverride<boolean>(
      'requiresAuth',
      [context.getHandler(), context.getClass()],
    );

    if (!requiresAuth) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    return request.isAuthenticated();
  }
}
