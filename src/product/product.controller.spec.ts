import { Test, TestingModule } from '@nestjs/testing';
import { ProductController } from './product.controller';
import { ProducService } from './product.service';
import { AuthGuard } from '../guards/auth.guard';
import { guardMock } from '../testing/guard.mock';
import { RoleGuard } from '../guards/role.guard';
import { producServiceMock } from '../testing/product/produc-service.mock';
import { CreateProductDTOData } from '../testing/product/create-product-dto.mock';
import { productEntityList } from '../testing/product/product-entity-list.mock';
import { updateProductDTOData } from '../testing/product/update-product-dto.mock';
import { updatePatchUserDTOData } from '../testing/update-user-dto.mock';

describe('ProductController', () => {
  let productController: ProductController;
  let productService: ProducService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductController],
      providers: [producServiceMock],
    })
      .overrideGuard(AuthGuard)
      .useValue(guardMock)
      .overrideGuard(RoleGuard)
      .useValue(guardMock)
      .compile();

    productController = module.get<ProductController>(ProductController);
    productService = module.get<ProducService>(ProducService);
  });

  test('Validate definition', () => {
    expect(productController).toBeDefined();
    expect(productService).toBeDefined();
  });

  describe('Guard test in the ProductController', () => {
    test('Is guards working', () => {
      const guards = Reflect.getMetadata('__guards__', ProductController);

      expect(guards.length).toBe(2);
      expect(new guards[0]()).toBeInstanceOf(AuthGuard);
      expect(new guards[1]()).toBeInstanceOf(RoleGuard);
    });
  });

  describe('Create', () => {
    test('Create method', async () => {
      const result = await productController.create(CreateProductDTOData);

      expect(result).toEqual(productEntityList[0]);
    });
  });

  describe('Read', () => {
    test('Read all method', async () => {
      const result = await productController.readAll();

      expect(result).toEqual(productEntityList);
    });

    test('Read One method', async () => {
      const result = await productController.readOne(1);

      expect(result).toEqual(productEntityList[0]);
    });
  });

  describe('Update', () => {
    test('Update method', async () => {
      const result = await productController.update(updateProductDTOData, 1);

      expect(result).toEqual(productEntityList[0]);
    });

    test('Update Partial method', async () => {
      const result = await productController.updatePartial(
        updatePatchUserDTOData,
        1,
      );

      expect(result).toEqual(productEntityList[0]);
    });

    describe('Delete', () => {
      test('delete method', async () => {
        const result = await productController.delete(1);

        expect(result).toEqual({ success: true });
      });
    });
  });
});
