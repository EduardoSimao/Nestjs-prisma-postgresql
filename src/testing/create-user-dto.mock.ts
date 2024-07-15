import { Role } from "../enums/role.enum";
import { CreateUserDTO } from "../user/DTO/create-user.dto";


export const CreateUserDTOData: CreateUserDTO = {
    name: 'Test1',
    email: 'test1@test.com',
    password: "123456",
    role: Role.User
}
