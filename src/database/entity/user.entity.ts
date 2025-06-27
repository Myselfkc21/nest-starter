import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

//1.create the entity or model then go to the module where u want to use that model. fn its user.module
@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  username: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  avatar: string;

}
