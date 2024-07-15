import { BadRequestException, Body, Controller, FileTypeValidator, Head, Headers, MaxFileSizeValidator, ParseFilePipe, Post, Req, UploadedFile, UseGuards, UseInterceptors } from "@nestjs/common";
import { AuthLoginDTO } from "./dto/auth-login.dto";
import { AuthRegisterDTO } from "./dto/auth-register.dto";
import { AuthForgetDTO } from "./dto/auth-forget.dto";
import { AuthResetDTO } from "./dto/auth-reset.dto";
import { AuthService } from "./auth.service";
import { FileInterceptor } from "@nestjs/platform-express";
import { join } from "path";
import { UserService } from "../user/user.service";
import { FileService } from "../file/file.service";
import { AuthGuard } from "../guards/auth.guard";
import { User } from "../decorators/user-id.decorator";


@Controller('auth')
export class AuthController{

    constructor(
        private readonly userService: UserService,
        private readonly authService: AuthService,
        private readonly fileService: FileService
    ){}

    @Post('login')
    async login(@Body() {email, password}: AuthLoginDTO){
        return this.authService.login(email, password);

    }

    @Post('register')
    async register(@Body() body: AuthRegisterDTO){

        return this.authService.register(body);
    }

    @Post('forget')
    async forgot (@Body() {email}: AuthForgetDTO){
        return this.authService.forget(email);
    }

    @Post('reset')
    async reset(@Body() {password, token}: AuthResetDTO){
        return this.authService.reset(password, token);
    }

    @UseGuards(AuthGuard)
    @Post('me')
    async me(@User() user){

        return {user};

    }

    @UseInterceptors(FileInterceptor('file'))
    @UseGuards(AuthGuard)
    @Post('photo')
    async photo(
        @User() user, 
        @UploadedFile(new ParseFilePipe({
            validators: [
                new FileTypeValidator({fileType: 'image/jpeg'}),
                new MaxFileSizeValidator({maxSize: 1024 * 900})
            ]
        })) photo: Express.Multer.File){

        const path = join(__dirname, '..', '..','storage', 'photos', `photo-${user.id}.jpeg`);

        try {
            this.fileService.Upload(photo, path);
            
        } catch (error) {
            throw new BadRequestException(error)
        }

        return {sucess: true}

    }


}