import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Role } from "../enums/role.enum";
import { Roles_Key } from "../decorators/role.decorator";

@Injectable()
export class RoleGuard implements CanActivate{

    constructor(
        private readonly reflector: Reflector
    ){}
    
    async canActivate(context: ExecutionContext) {

        const requeiredRoles = this.reflector.getAllAndOverride<Role[]>(Roles_Key, [context.getHandler(), context.getClass()])
        
        if(!requeiredRoles){
            return true;
        }
        const {user} = context.switchToHttp().getRequest();

        const rolesFilted = requeiredRoles.filter(role => role === user.role)

        return rolesFilted.length > 0
    }

}