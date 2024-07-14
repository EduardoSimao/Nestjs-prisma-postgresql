import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateUserDTO } from "./DTO/create-user.dto";
import { PrismaService } from "src/prisma/prisma.service";
import { UpdateUserDTO } from "./DTO/update-user.dto";
import { UpdatePatchUserDTO } from "./DTO/update-patch-user.dto";
import * as bcrypt from 'bcrypt'


@Injectable()
export class UserService{
    
    constructor(private readonly prisma: PrismaService) {}    
    
    async create(data: CreateUserDTO){


        const salt = await bcrypt.genSalt()

        data.password = await bcrypt.hash(data.password, salt )

        return this.prisma.user.create({
            data
        });
    }

    async readAll(){

        return this.prisma.user.findMany();
    }

    async ReadOne(id: number){
        await this.existes(id);

        return this.prisma.user.findUnique({
            where:{
                id
            }
        });
    }

    async Update(data: UpdateUserDTO, id: number){

        await this.existes(id);

        
        const salt = await bcrypt.genSalt()

        data.password = await bcrypt.hash(data.password, salt )

        return this.prisma.user.update({
            data,
            where: {
                id
            }
        })
    }

    async UpdatePartial(data: UpdatePatchUserDTO, id: number){
        
        await this.existes(id);

        if(data.password){
            const salt = await bcrypt.genSalt()

            data.password = await bcrypt.hash(data.password, salt )
        }

        return this.prisma.user.update({
            data,
            where: {
                id
            }
        })
    }

    
    async Delete(id: number){

        await this.existes(id);

        return this.prisma.user.delete({
            where:{
                id
            }
        });
    }

    async existes(id: number){
        if(!(await this.prisma.user.count({
            where: {
                id
            }
        }))){
            throw new NotFoundException(`O Usuario ${id} não existe`)
        }
    }

}