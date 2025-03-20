import { Users } from 'src/users/users.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Passwords {
  @PrimaryGeneratedColumn({ type: 'int' })
  passwordid: number;

  @Column({ type: 'varchar', nullable: false })
  siteName: string;

  @Column({ type: 'varchar', nullable: false })
  siteEmail: string;

  @Column({ type: 'text', nullable: false })
  sitePassword: string;

  @ManyToOne(() => Users, (user) => user.passwords, { nullable: false })
  @JoinColumn({ name: 'userid' })
  user: Users;

  @CreateDateColumn()
  createdat: Date;
}
