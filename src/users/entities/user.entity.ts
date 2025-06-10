import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'users' })
export class User {
  @PrimaryColumn('uuid')
  id: string;

  @Column({ name: 'tg_user_id', type: 'bigint', unique: true })
  tgUserId: number;

  @Column({ name: 'first_name', type: 'varchar', length: 255, nullable: true })
  firstName: string;

  @Column({ name: 'last_name', type: 'varchar', length: 255, nullable: true })
  lastName: string;

  @Column({ name: 'user_name', type: 'varchar', length: 255, nullable: true })
  username: string;

  @Column({
    name: 'language_code',
    type: 'varchar',
    length: 50,
    nullable: true,
  })
  languageCode: string;

  @Column({ name: 'photo_url', type: 'text', nullable: true })
  photoUrl: string;

  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz' })
  updatedAt: Date;
}
