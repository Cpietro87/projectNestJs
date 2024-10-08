import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './users.entity';
import { Repository } from 'typeorm';
import { CreateUsersDto } from './dto/create-users.dto';
import { UpdateUsersDto } from './dto/update-users.dto';
import { CreateProfileDto } from './dto/create-profile.dto';
import { Profile } from './profile.entity';

@Injectable()
export class UsersService {

    constructor(
        @InjectRepository(User) private userRespository: Repository<User>,
        @InjectRepository(Profile) private profileRepository: Repository<Profile>
    ){}

    findUsers(){
        return this.userRespository.find();
    }

    async findUser(id: number){

        const userFound = await this.userRespository.findOne({
            where: {
                id
            }
        });

        if(!userFound){
            return new HttpException('Usuario no encontrado', HttpStatus.NOT_FOUND)
        }


    }

    async createUsers(user: CreateUsersDto ){

        const userFound = await this.userRespository.findOne({
            where:{
                username: user.username
            }
        })
        if(userFound){
            return new HttpException('Usuario ya existe', HttpStatus.CONFLICT)
        }
        const newUsers =  this.userRespository.create(user) 
        return this.userRespository.save(newUsers)
    }

     removeUsers(id: number){
        return this.userRespository.delete(id)
     }

     updateUser(id: number, updateUserDto: UpdateUsersDto){
        return this.userRespository.update({id}, updateUserDto)
     }

     async createProfile(id: number, profile: CreateProfileDto){
        const userFound = await this.userRespository.findOne({ where: { id } })

        if(!userFound){
            return new HttpException('Usuario no encontrado ', HttpStatus.NOT_FOUND)
        }

        const newProfile = this.profileRepository.create(profile)

        const saveProfile = await this.profileRepository.save(newProfile)

        userFound.profile = saveProfile

        return this.userRespository.save(userFound)

     }
}
