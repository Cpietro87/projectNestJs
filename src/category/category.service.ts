import { Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from './entities/category.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CategoryService {

  constructor( @InjectRepository(Category) private categoryRepository: Repository<Category> ){}

  createCategory( category: CreateCategoryDto) {
    const newCategory = this.categoryRepository.create(category); 
    return this.categoryRepository.save(newCategory);
  }

  findAllCategory() {
    return this.categoryRepository.find()
  }

  findOne(id: number) {
    return this.categoryRepository.findOne({
      where: {
        id
      }
    });
  }

  update(id: number, updateCategoryDto: UpdateCategoryDto) {
    return `This action updates a #${id} category`;
  }

  remove(id: number) {
    return `This action removes a #${id} category`;
  }
}
