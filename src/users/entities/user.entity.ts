import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('users')
export default class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column()
  name: string;

  @Column()
  age: string;

  @Column()
  city: string;
}
