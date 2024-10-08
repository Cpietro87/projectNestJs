import { Body, Controller, Post, Get, Delete, Param, Patch, ParseIntPipe } from '@nestjs/common';
import { User } from './users.entity';
import { CreateUsersDto } from './dto/create-users.dto';
import { UsersService } from './users.service';
import { UpdateUsersDto } from './dto/update-users.dto';
import { CreateProfileDto } from './dto/create-profile.dto';

@Controller('users')
export class UsersController {
    constructor( private readonly userService: UsersService){}
    
    @Post()
    create(@Body() newUsers: CreateUsersDto){
        return this.userService.createUsers(newUsers)
    }

    @Get()
    findAll(): Promise <User[]>{
        return this.userService.findUsers();
    }

    @Get(':id')
    findOne(@Param('id') id:string ) {
        console.log(id);
        console.log(typeof id);
        return this.userService.findUser(+id)
    }

    @Patch(':id') 
    update(@Param('id') id: string, @Body() updateUserDto: UpdateUsersDto){
        return this.userService.updateUser(+id, updateUserDto)
    }

    @Delete(':id')
    remove(@Param('id') id: string){
        return this.userService.removeUsers(+id)
    }

    @Post(':id/profile')
    createProfile(
        @Param('id', ParseIntPipe) id: number,
        @Body() profile: CreateProfileDto
    ){
        return this.userService.createProfile(id, profile)
    }
}
