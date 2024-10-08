
import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm"
import { Profile } from "./profile.entity"
import { Post } from "src/post/entities/post.entity"


@Entity({name: 'users'})
export class User {

    @PrimaryGeneratedColumn()
    id: number

    @Column({ unique: true})
    username: string

    @Column()
    password: string
    
    @Column({ default: true})
    isActive: boolean

    @Column({type: 'datetime', default: () => 'CURRENT_TIMESTAMP'})
    createAt: Date

    @OneToOne(() => Profile)
    @JoinColumn()
    profile: Profile

    @OneToMany( () => Post, post => post.author )
    posts: Post[]
}