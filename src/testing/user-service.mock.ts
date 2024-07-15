import { UserService } from '../user/user.service';
import { userEntityList } from './user-entity-list.mock';

export const userServiceMock = {
  provide: UserService,
  useValue: {
    ReadOne: jest.fn().mockResolvedValue(userEntityList[0]),
    create: jest.fn().mockResolvedValue(userEntityList[0]),
    readAll: jest.fn().mockResolvedValue(userEntityList),
    Update: jest.fn().mockResolvedValue(userEntityList[0]),
    UpdatePartial: jest.fn().mockResolvedValue(userEntityList[0]),
    Delete: jest.fn().mockResolvedValue(true),
    existes: jest.fn().mockResolvedValue(true),
  },
};
