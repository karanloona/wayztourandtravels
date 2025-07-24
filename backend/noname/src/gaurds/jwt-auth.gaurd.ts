import { ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { Observable } from "rxjs";
import { secret } from "../constants/common.constant";


export const API_BEARER_AUTH_NAME = 'JWT-Auth';

@Injectable()
export class JwtAuthGaurd extends AuthGuard('jwt') {
    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const request = context.switchToHttp().getRequest();
        const authorizationHeader = request.headers['authorization'];
        if (authorizationHeader) {
            const token = authorizationHeader.replace('Bearer ', '');
            
            if (token === secret) {
                return true;
            }
        }
        return super.canActivate(context);
    }
    handleRequest(err, user, info) {
        // You can throw an exception based on either "info" or "err" arguments
        if (err || !user) {
          throw err || new UnauthorizedException();
        }
        return user;
    }
}