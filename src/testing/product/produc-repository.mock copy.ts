import { getRepositoryToken } from '@nestjs/typeorm';
import { ProductEntity } from '../../product/entity/product.entity';
import { productEntityList } from './product-entity-list.mock';

export const productRepositoryMock = {
  provide: getRepositoryToken(ProductEntity),
  useValue: {
    exists: jest.fn().mockResolvedValue(true),
    create: jest.fn(),
    save: jest.fn().mockResolvedValue(productEntityList[0]),
    find: jest.fn().mockResolvedValue(productEntityList),
    findOne: jest.fn().mockResolvedValue(productEntityList[0]),
    update: jest.fn(),
    delete: jest.fn(),
  },
};
