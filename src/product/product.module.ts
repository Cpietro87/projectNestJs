import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { Category } from 'src/category/entities/category.entity';
import { CategoryModule } from 'src/category/category.module';

@Module({
  imports:[TypeOrmModule.forFeature([Product, Category]), CategoryModule],
  controllers: [ProductController],
  providers: [ProductService],
})
export class ProductModule {}
