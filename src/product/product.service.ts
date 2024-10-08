import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { Repository } from "typeorm";
import { CategoryService } from 'src/category/category.service';

@Injectable()
export class ProductService {

  constructor(
    @InjectRepository(Product) private productRepository: Repository<Product>,
    private categoryService: CategoryService
  ){}

  async createProduct(product: CreateProductDto) {
    const categoryFound = await this.categoryService.findOne(product.categoryId)

    if(!categoryFound){
      return new HttpException('categoria no encontrada', HttpStatus.NOT_FOUND)
    }

    const newProduct = this.productRepository.create(product); 
    return this.productRepository.save(newProduct);
  }

  findAll() {
    return this.productRepository.find();
  }

  findOne(id: number) {
    return this.productRepository.findOne({
      where: {
        id
      }
    });
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    return this.productRepository.update({id}, updateProductDto);
  }

  remove(id: number) {
    return this.productRepository.delete(id);
  }
} 
