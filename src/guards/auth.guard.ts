import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { UserService } from "../user/user.service";
import { AuthService } from "../auth/auth.service";

@Injectable()
export class AuthGuard implements CanActivate{

    constructor(
        private readonly authService: AuthService,
        private readonly userService: UserService
    ){}
    
    async canActivate(context: ExecutionContext) {
        
        const request = context.switchToHttp().getRequest();
        const {authorization} = request.headers;

        try {
            const data = this.authService.verificartoken((authorization ?? '').split(' ')[1]);

            request.tokenPayload = data;

            request.user = await this.userService.ReadOne(data.id);

            return true;
        } catch (error) {
            return false
        }
        
    }

}