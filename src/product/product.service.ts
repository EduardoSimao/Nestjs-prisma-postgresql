import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductEntity } from './entity/product.entity';
import { Repository } from 'typeorm';
import { CreateProductDTO } from './dto/create-user.dto';
import { UpdateProductDTO } from './dto/update-product.dto';
import { UpdatePatchProductDTO } from './dto/update-patch-produc.dto';

@Injectable()
export class ProducService {
  constructor(
    @InjectRepository(ProductEntity)
    private producRepository: Repository<ProductEntity>,
  ) {}

  async create(data: CreateProductDTO) {
    if (
      await this.producRepository.exists({
        where: {
          code: data.code,
        },
      })
    ) {
      throw new BadRequestException('Esse produto ja existe');
    }

    const user = this.producRepository.create(data);

    return this.producRepository.save(user);
  }

  async readAll() {
    return this.producRepository.find();
  }

  async ReadOne(code: number) {
    await this.existes(code);

    return this.producRepository.findOne({
      where: {
        code,
      },
    });
  }

  async existes(code: number) {
    if (
      !(await this.producRepository.exists({
        where: {
          code,
        },
      }))
    ) {
      throw new NotFoundException(`O Produco ${code} não existe`);
    }
  }

  async Update(data: UpdateProductDTO, id: number) {
    await this.existes(id);

    await this.producRepository.update(id, data);

    return this.ReadOne(id);
  }

  async UpdatePartial(data: UpdatePatchProductDTO, id: number) {
    await this.existes(id);

    await this.producRepository.update(id, data);

    return this.ReadOne(id);
  }

  async Delete(id: number) {
    await this.existes(id);

    await this.producRepository.delete(id);

    return true;
  }
}
