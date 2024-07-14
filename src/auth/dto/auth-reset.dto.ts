import { IsEmail, IsJWT, IsStrongPassword } from "class-validator";


export class AuthResetDTO{

    @IsJWT()
    token: string;
    
    @IsStrongPassword({
        minLength: 6,
        minNumbers: 0,
        minLowercase: 0,
        minUppercase: 0,
        minSymbols: 0
    })
    password: string;
}