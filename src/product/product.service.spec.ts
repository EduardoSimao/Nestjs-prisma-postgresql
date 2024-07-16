import { Repository } from 'typeorm';
import { ProducService } from './product.service';
import { ProductEntity } from './entity/product.entity';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { productRepositoryMock } from '../testing/product/produc-repository.mock copy';
import { productEntityList } from '../testing/product/product-entity-list.mock';
import { CreateProductDTOData } from '../testing/product/create-product-dto.mock';
import { updateProductDTOData } from '../testing/product/update-product-dto.mock';
import { updatePatchUserDTOData } from '../testing/update-user-dto.mock';

describe('productService', () => {
  let procuctService;
  ProducService;
  let productRepository: Repository<ProductEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProducService, productRepositoryMock],
    }).compile();

    procuctService = module.get<ProducService>(ProducService);
    productRepository = module.get(getRepositoryToken(ProductEntity));
  });

  test('Validate definition', () => {
    expect(procuctService).toBeDefined();
    expect(productRepository).toBeDefined();
  });

  describe('Create', () => {
    test('Method Create user', async () => {
      jest.spyOn(productRepository, 'exists').mockResolvedValueOnce(false);

      const result = await procuctService.create(CreateProductDTOData);

      expect(result).toEqual(productEntityList[0]);
    });
  });
  describe('Read', () => {
    test('Method Read All products', async () => {
      const result = await procuctService.readAll();

      expect(result).toEqual(productEntityList);
    });

    test('Method Read One product', async () => {
      const result = await procuctService.ReadOne(1);

      expect(result).toEqual(productEntityList[0]);
    });
  });
  describe('Update', () => {
    test('Method Update product', async () => {
      const result = await procuctService.Update(updateProductDTOData, 1);

      expect(result).toEqual(productEntityList[0]);
    });

    test('Method partial Update product', async () => {
      const result = await procuctService.UpdatePartial(
        updatePatchUserDTOData,
        1,
      );

      expect(result).toEqual(productEntityList[0]);
    });
  });
  describe('Delete', () => {
    test('Method Delete product', async () => {
      const result = await procuctService.Delete(1);

      expect(result).toEqual(true);
    });
  });
});
