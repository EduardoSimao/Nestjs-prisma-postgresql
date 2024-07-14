import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Roles_Key } from "src/decorators/role.decorator";
import { Role } from "src/enums/role.enum";

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