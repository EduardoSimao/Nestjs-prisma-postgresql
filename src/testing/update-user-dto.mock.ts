import { Role } from "../enums/role.enum";
import { UpdatePatchUserDTO } from "../user/DTO/update-patch-user.dto";
import { UpdateUserDTO } from "../user/DTO/update-user.dto";


export const updateUserDTOData: UpdateUserDTO = {
    name: 'Test1',
    email: 'test1@test.com',
    password: "123456",
    role: Role.User
}

export const updatePatchUserDTOData: UpdatePatchUserDTO = {
    role: Role.Admin
}
