import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { CreateUserDTO } from "./DTO/create-user.dto";
import { UpdateUserDTO } from "./DTO/update-user.dto";
import { UpdatePatchUserDTO } from "./DTO/update-patch-user.dto";
import * as bcrypt from 'bcrypt'
import { Repository } from "typeorm";
import { UserEntity } from "./entity/user.entity";
import { InjectRepository } from "@nestjs/typeorm";


@Injectable()
export class UserService{
    
    constructor(
        @InjectRepository(UserEntity)
        private userRepository: Repository<UserEntity>
    ) {}    
    
    async create(data: CreateUserDTO){

        if(await this.userRepository.exists({
            where:{
                email: data.email
            }
        })){
            throw new BadRequestException("Esse email ja éxiste")
        }

        const salt = await bcrypt.genSalt()

        data.password = await bcrypt.hash(data.password, salt )

        const user =  this.userRepository.create(data);

        return this.userRepository.save(user)
        

    }

    async readAll(){

        return this.userRepository.find();
    }

    async ReadOne(id: number){
        await this.existes(id);

        return this.userRepository.findOne({
            where:{
                id
            }
        });
    }

    async Update(data: UpdateUserDTO, id: number){

        await this.existes(id);
        
        
        const salt = await bcrypt.genSalt()

        data.password = await bcrypt.hash(data.password, salt )

        await this.userRepository.update(id, data)

        return this.ReadOne(id)
    }

    async UpdatePartial(data: UpdatePatchUserDTO, id: number){
        
        await this.existes(id);

        if(data.password){
            const salt = await bcrypt.genSalt()

            data.password = await bcrypt.hash(data.password, salt )
        }

        await this.userRepository.update(id, data)

        return this.ReadOne(id)
    }

    
    async Delete(id: number){

        await this.existes(id);

        return this.userRepository.delete(id);
    }

    async existes(id: number){
        if(!(await this.userRepository.count({
            where: {
                id
            }
        }))){
            throw new NotFoundException(`O Usuario ${id} não existe`)
        }
    }

}