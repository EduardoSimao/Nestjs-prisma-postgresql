import { ProductEntity } from '../../product/entity/product.entity';

export const productEntityList: ProductEntity[] = [
  {
    name: 'Teclado',
    id: 1,
    code: 1,
    price: 99.99,
    quantity: 10,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    name: 'Mouse',
    id: 2,
    code: 2,
    price: 50.99,
    quantity: 10,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    name: 'Monitor',
    id: 3,
    code: 3,
    price: 999.99,
    quantity: 10,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];
