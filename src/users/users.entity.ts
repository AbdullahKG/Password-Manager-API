import { Passwords } from 'src/passwords/passwords.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Users {
  @PrimaryGeneratedColumn({
    type: 'int',
  })
  userid: number;

  @Column({
    type: 'varchar',
    nullable: false,
    unique: true,
  })
  username: string;

  @Column({
    type: 'varchar',
    nullable: false,
  })
  password: string;

  @OneToMany(() => Passwords, (password) => password.user)
  passwords: Passwords[];

  @CreateDateColumn()
  createdat: Date;
}
