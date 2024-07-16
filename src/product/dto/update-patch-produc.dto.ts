import { PartialType } from '@nestjs/mapped-types';
import { CreateProductDTO } from './create-user.dto';

export class UpdatePatchProductDTO extends PartialType(CreateProductDTO) {}
