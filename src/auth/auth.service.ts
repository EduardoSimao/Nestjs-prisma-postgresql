import { BadRequestException, Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { AuthRegisterDTO } from "./dto/auth-register.dto";
import * as bcrypt from 'bcrypt'
import { MailerService } from "@nestjs-modules/mailer";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { UserService } from "../user/user.service";
import { UserEntity } from "../user/entity/user.entity";

@Injectable()
export class AuthService{

    private issuer = 'login';
    private audience = 'users'

    constructor(
        private readonly jwtService: JwtService, 
        private readonly userService: UserService,
        private readonly mailer: MailerService,
        @InjectRepository(UserEntity)
        private userRepository: Repository<UserEntity>
    ){}


    createToken(user: UserEntity){
        return {
            accessToken: this.jwtService.sign({
            id: user.id,
            name: user.name,
            email : user.email
        }, {
            expiresIn: "7 days",
            subject: String(user.id),
            issuer: this.issuer,
            audience: this.audience
        })}
    }


    verificartoken(token: string){
        try {
            const data = this.jwtService.verify(token, {
                issuer: this.issuer,
                audience: this.audience
            })

            return data;
            
        } catch (e) {
            throw new BadRequestException(e);
        }
    }

    isValidaToken(token: string){
        try {
            this.verificartoken(token);
            return true;
            
        } catch (error) {
            return false;
        }
    }

    async login(email: string, password: string){
        const user = await this.userRepository.findOne({
            where:{
                email
            }
        });

        if(!user){
            throw new UnauthorizedException(`email e/ou senha incorretos.`)
        }

        if(!await bcrypt.compare(password, user.password)){
            throw new UnauthorizedException(`email e/ou senha incorretos.`)
        }

        return this.createToken(user);
    }

    async forget(email: string){
        const user = await this.userRepository.findOne({
            where:{
                email
            }
        });

        if(!user){
            throw new UnauthorizedException(`email incorreto.`)
        }

        const token = this.jwtService.sign({
            id: user.id
        },{
            expiresIn: "30 minutes",
            subject: String(user.id),
            issuer: 'forget',
            audience: 'users'
        });

        await this.mailer.sendMail({
            subject: 'Recuperação de Senha',
            to: 'test@email.com',
            template: 'forget',
            context: {
                name: user.name,
                token
            }
        })

        return true;
    }

    async reset(password: string, token: string){

        //Validar Token
         try {
             const data = this.jwtService.verify(token, {
                 issuer: 'forget',
                 audience: 'users'
             })
            
             if (isNaN(Number(data.id))){
                 throw new BadRequestException("Token Invalido");

            }

            const salt = await bcrypt.genSalt()

            password = await bcrypt.hash(password, salt )

            await this.userRepository.update(Number(data.id), {password});

            const user = await this.userService.ReadOne(Number(data.id));
            return this.createToken(user);

         } catch (e) {
             throw new BadRequestException(e);
         }

        

    }

    async register(data: AuthRegisterDTO){
        
        delete data.role;
        const user = await this.userService.create(data);
       return this.createToken(user);

    }
}