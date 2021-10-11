import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('user')
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
