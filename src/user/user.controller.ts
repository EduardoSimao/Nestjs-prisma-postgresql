import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Put, UseGuards, UseInterceptors } from "@nestjs/common";
import { CreateUserDTO } from "./DTO/create-user.dto";
import { UpdateUserDTO } from "./DTO/update-user.dto";
import { UpdatePatchUserDTO } from "./DTO/update-patch-user.dto";
import { UserService } from "./user.service";
import { ParamID } from "src/decorators/param-id.decorator";
import { Roles } from "src/decorators/role.decorator";
import { Role } from "src/enums/role.enum";
import { RoleGuard } from "src/guards/role.guard";
import { AuthGuard } from "src/guards/auth.guard";

//@UseInterceptors(LogInterceptor)
@Roles(Role.Admin)
@UseGuards(AuthGuard,RoleGuard)
@Controller('users')
export class UserController{

    constructor(private readonly userService: UserService){}

    @Post()
    async create(@Body() data: CreateUserDTO){

        return this.userService.create(data);
    }

    @Get()
    async readAll(){
        return this.userService.readAll();
    }
    @Get(':id')
    async readOne(@ParamID() id: number){
        return this.userService.ReadOne(id);

    }

    @Put(':id')
    async update(@Body() data: UpdateUserDTO, @ParamID() id: number){
        return this.userService.Update(data, id);
    }

    @Patch(':id')
    async updatePartial(@Body() data: UpdatePatchUserDTO, @ParamID() id: number){
        return this.userService.UpdatePartial(data, id);

    }

    @Delete(':id')
    async delete(@ParamID() id: number){
        return this.userService.Delete(id);
    }
}