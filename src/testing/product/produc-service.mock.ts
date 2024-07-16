import { ProducService } from '../../product/product.service';
import { productEntityList } from './product-entity-list.mock';

export const producServiceMock = {
  provide: ProducService,
  useValue: {
    ReadOne: jest.fn().mockResolvedValue(productEntityList[0]),
    create: jest.fn().mockResolvedValue(productEntityList[0]),
    readAll: jest.fn().mockResolvedValue(productEntityList),
    Update: jest.fn().mockResolvedValue(productEntityList[0]),
    UpdatePartial: jest.fn().mockResolvedValue(productEntityList[0]),
    Delete: jest.fn().mockResolvedValue(true),
    existes: jest.fn().mockResolvedValue(true),
  },
};
