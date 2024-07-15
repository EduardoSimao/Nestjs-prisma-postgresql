import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { userServiceMock } from '../testing/user-service.mock';
import { AuthGuard } from '../guards/auth.guard';
import { guardMock } from '../testing/guard.mock';
import { RoleGuard } from '../guards/role.guard';
import { UserService } from './user.service';
import { CreateUserDTOData } from '../testing/create-user-dto.mock';
import { userEntityList } from '../testing/user-entity-list.mock';
import {
  updatePatchUserDTOData,
  updateUserDTOData,
} from '../testing/update-user-dto.mock';

describe('UserController', () => {
  let userController: UserController;
  let userService: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [userServiceMock],
    })
      .overrideGuard(AuthGuard)
      .useValue(guardMock)
      .overrideGuard(RoleGuard)
      .useValue(guardMock)
      .compile();

    userController = module.get<UserController>(UserController);
    userService = module.get<UserService>(UserService);
  });

  test('Validate definition', () => {
    expect(userController).toBeDefined();
    expect(userService).toBeDefined();
  });

  describe('Guard test in the UserController', () => {
    test('Is guards working', () => {
      const guards = Reflect.getMetadata('__guards__', UserController);

      expect(guards.length).toBe(2);
      expect(new guards[0]()).toBeInstanceOf(AuthGuard);
      expect(new guards[1]()).toBeInstanceOf(RoleGuard);
    });
  });

  describe('Create', () => {
    test('Create method', async () => {
      const result = await userController.create(CreateUserDTOData);

      expect(result).toEqual(userEntityList[0]);
    });
  });

  describe('Read', () => {
    test('Read all method', async () => {
      const result = await userController.readAll();

      expect(result).toEqual(userEntityList);
    });

    test('Read One method', async () => {
      const result = await userController.readOne(1);

      expect(result).toEqual(userEntityList[0]);
    });
  });

  describe('Update', () => {
    test('Update method', async () => {
      const result = await userController.update(updateUserDTOData, 1);

      expect(result).toEqual(userEntityList[0]);
    });

    test('Update Partial method', async () => {
      const result = await userController.updatePartial(
        updatePatchUserDTOData,
        1,
      );

      expect(result).toEqual(userEntityList[0]);
    });
  });

  describe('Delete', () => {
    test('delete method', async () => {
      const result = await userController.delete(1);

      expect(result).toEqual({ success: true });
    });
  });
});
