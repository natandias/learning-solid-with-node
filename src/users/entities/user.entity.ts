import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, DeleteDateColumn } from 'typeorm';

@Entity('users')
export default class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column('text')
  name: string;

  @Column('text')
  age: number;

  @Column('text')
  city: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
