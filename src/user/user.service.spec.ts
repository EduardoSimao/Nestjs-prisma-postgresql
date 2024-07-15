import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { userEntityList } from '../testing/user-entity-list.mock';
import { CreateUserDTOData } from '../testing/create-user-dto.mock';
import { Repository } from 'typeorm';
import { UserEntity } from './entity/user.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import {
  updatePatchUserDTOData,
  updateUserDTOData,
} from '../testing/update-user-dto.mock';
import { userRepositoryMock } from '../testing/user-repository.mock';

describe('UserService', () => {
  let userService;
  UserService;
  let userRepository: Repository<UserEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserService, userRepositoryMock],
    }).compile();

    userService = module.get<UserService>(UserService);
    userRepository = module.get(getRepositoryToken(UserEntity));
  });

  test('Validate definition', () => {
    expect(userService).toBeDefined();
    expect(userRepository).toBeDefined();
  });

  describe('Create', () => {
    test('Method Create user', async () => {
      jest.spyOn(userRepository, 'exists').mockResolvedValueOnce(false);

      const result = await userService.create(CreateUserDTOData);

      expect(result).toEqual(userEntityList[0]);
    });
  });

  describe('Read', () => {
    test('Method Read All user', async () => {
      const result = await userService.readAll();

      expect(result).toEqual(userEntityList);
    });

    test('Method Read One user', async () => {
      const result = await userService.ReadOne(1);

      expect(result).toEqual(userEntityList[0]);
    });
  });

  describe('Update', () => {
    test('Method Update user', async () => {
      const result = await userService.Update(updateUserDTOData, 1);

      expect(result).toEqual(userEntityList[0]);
    });

    test('Method partial Update user', async () => {
      const result = await userService.UpdatePartial(updatePatchUserDTOData, 1);

      expect(result).toEqual(userEntityList[0]);
    });
  });
  describe('Delete', () => {
    test('Method Delete user', async () => {
      const result = await userService.Delete(1);

      expect(result).toEqual(true);
    });
  });
});
