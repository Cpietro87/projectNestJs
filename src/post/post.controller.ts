import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PostService } from './post.service';
import { CreatePostDto } from './dto/create-post.dto';

@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Post()
  create(@Body() post: CreatePostDto) {
    return this.postService.create(post);
  }

  @Get()
  findAll() {
    return this.postService.findAll();
  }

 
}
