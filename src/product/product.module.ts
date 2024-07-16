import {
  forwardRef,
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { ProductIdCheckMiddleware } from '../middlewares/product-id-check.middleware';
import { AuthModule } from '../auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductEntity } from './entity/product.entity';
import { ProductController } from './product.controller';
import { ProducService } from './product.service';
import { UserModule } from '../user/user.module';

@Module({
  imports: [
    forwardRef(() => AuthModule),
    UserModule,
    TypeOrmModule.forFeature([ProductEntity]),
  ],
  controllers: [ProductController],
  providers: [ProducService],
  exports: [ProducService],
})
export class ProducModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(ProductIdCheckMiddleware).forRoutes({
      path: 'products/:id',
      method: RequestMethod.ALL,
    });
  }
}
