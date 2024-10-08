import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Post } from './entities/post.entity';
import { UsersService } from 'src/users/users.service';
import { Repository } from 'typeorm';

@Injectable()
export class PostService {

  constructor(
    @InjectRepository(Post) private postRepository: Repository<Post>,
    private userService: UsersService
  ){}

  create(post: CreatePostDto) {
    const userFound = this.userService.findUser(post.authorId)

    if(!userFound){
      return new HttpException('user no encotrado', HttpStatus.NOT_FOUND)
    }

    const newPost = this.postRepository.create(post)
    return this.postRepository.save(newPost)
  }

  findAll() {
    return this.postRepository.find({
      relations: ['author'],
    });
  }

 
}
