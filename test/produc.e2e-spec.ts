import { INestApplication } from "@nestjs/common";
import { Test, TestingModule } from "@nestjs/testing";
import { AppModule } from "../src/app.module";
import { CreateProductDTOData } from "../src/testing/product/create-product-dto.mock";
import * as request from 'supertest';
import { authRegisterDTOMock } from "../src/testing/auth-register-dt0.mock";
import { Role } from "../src/enums/role.enum";
import dataSource from "../typeorm/data-source";
import { updatePatchUserDTOData, updateProductDTOData } from "../src/testing/product/update-product-dto.mock";


describe('ProductController (e2e)', () => {
  let app: INestApplication;
  let accessToken: string;
  let userId: number;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterEach(() => {
    app.close();
  });

  it('OK - Create User', async () => {
    const response = await request(app.getHttpServer())
      .post('/auth/register')
      .send({
        ...authRegisterDTOMock,
        email: 'testadmproducts@adm.com',
      });

    expect(response.statusCode).toEqual(201);
    expect(typeof response.body.accessToken).toEqual('string');

    accessToken = response.body.accessToken;
  });

  it('OK - Get User', async () => {
    const response = await request(app.getHttpServer())
      .post('/auth/me')
      .set('Authorization', `bearer ${accessToken}`)
      .send();

    expect(response.statusCode).toEqual(201);
    expect(typeof response.body.id).toEqual('number');
    expect(response.body.role).toEqual(Role.User);

    userId = response.body.id;
  });

  it('OK - Change user role to Admin', async () => {
    const ds = await dataSource.initialize();

    const queryRunner = ds.createQueryRunner();
    await queryRunner.query(
      `UPDATE users SET role = ${Role.Admin} WHERE id = ${userId}`,
    );

    const rows = await queryRunner.query(
      `SELECT * FROM users WHERE id = ${userId}`,
    );

    dataSource.destroy();

    expect(rows.length).toEqual(1);
    expect(rows[0].role).toEqual(Role.Admin);
  });

  it('OK - Create product', async () => {
    const response = await request(app.getHttpServer())
      .post('/products')
      .set('Authorization', `bearer ${accessToken}`)
      .send(CreateProductDTOData);

    expect(response.statusCode).toEqual(201);
  });

  it('OK - Get product', async () => {
    const response = await request(app.getHttpServer())
      .get('/products/1')
      .set('Authorization', `bearer ${accessToken}`)
      .send();

    expect(response.statusCode).toEqual(200);
  });

  it('OK - Update product', async () => {
    const response = await request(app.getHttpServer())
      .put('/products/1')
      .set('Authorization', `bearer ${accessToken}`)
      .send(updateProductDTOData);

    expect(response.statusCode).toEqual(200);
  });

  it('OK - Update product', async () => {
    const response = await request(app.getHttpServer())
      .patch('/products/1')
      .set('Authorization', `bearer ${accessToken}`)
      .send(updatePatchUserDTOData);

    expect(response.statusCode).toEqual(200);
  });

  it('OK - Delete product', async () => {
    const response = await request(app.getHttpServer())
      .delete('/products/1')
      .set('Authorization', `bearer ${accessToken}`)
      .send();

    expect(response.statusCode).toEqual(200);
  });
});
