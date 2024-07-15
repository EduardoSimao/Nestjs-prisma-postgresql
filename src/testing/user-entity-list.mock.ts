import { Role } from '../enums/role.enum';
import { UserEntity } from '../user/entity/user.entity';

export const userEntityList: UserEntity[] = [
  {
    name: 'Test1',
    email: 'test1@test.com',
    password: '$2b$10$EtWDKNUzonWS702lw1DZ.uMgutSGkorSXiqIQUKn0W4CoNldu6Tse',
    id: 1,
    role: Role.Admin,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    name: 'Test2',
    email: 'test2@test.com',
    password: '$2b$10$EtWDKNUzonWS702lw1DZ.uMgutSGkorSXiqIQUKn0W4CoNldu6Tse',
    id: 2,
    role: Role.Admin,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    name: 'Test3',
    email: 'test3@test.com',
    password: '$2b$10$EtWDKNUzonWS702lw1DZ.uMgutSGkorSXiqIQUKn0W4CoNldu6Tse',
    id: 3,
    role: Role.Admin,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];
