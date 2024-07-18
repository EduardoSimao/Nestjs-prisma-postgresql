import {
  Body,
  Controller,
  Delete,
  Get,
  Patch,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '../guards/auth.guard';
import { RoleGuard } from '../guards/role.guard';
import { ProducService } from './product.service';
import { CreateProductDTO } from './dto/create-user.dto';
import { Roles } from '../decorators/role.decorator';
import { Role } from '../enums/role.enum';
import { ParamID } from '../decorators/param-id.decorator';
import { UpdatePatchProductDTO } from './dto/update-patch-produc.dto';
import { UpdateProductDTO } from './dto/update-product.dto';

@Roles(Role.Admin)
@UseGuards(AuthGuard, RoleGuard)
@Controller('products')
export class ProductController {
  constructor(private readonly producService: ProducService) {}

  @Post()
  async create(@Body() data: CreateProductDTO) {
    return this.producService.create(data);
  }

  @Roles(Role.User, Role.Admin)
  @Get()
  async readAll() {
    return this.producService.readAll();
  }

  @Roles(Role.User, Role.Admin)
  @Get(':id')
  async readOne(@ParamID() id: number) {
    return this.producService.ReadOne(id);
  }

  @Put(':id')
  async update(@Body() data: UpdateProductDTO, @ParamID() id: number) {
    return this.producService.Update(data, id);
  }

  @Patch(':id')
  async updatePartial(
    @Body() data: UpdatePatchProductDTO,
    @ParamID() id: number,
  ) {
    return this.producService.UpdatePartial(data, id);
  }

  @Delete(':id')
  async delete(@ParamID() id: number) {
    return { success: await this.producService.Delete(id) };
  }
}
