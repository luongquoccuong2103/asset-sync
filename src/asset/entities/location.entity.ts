import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Asset } from './asset.entity';

@Entity()
export class Location {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  organization: string;

  @Column()
  status: string;

  @OneToMany(() => Asset, (asset) => asset.location)
  assets: Asset[];
}
