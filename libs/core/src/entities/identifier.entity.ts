import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { HealthCareProvider } from '@app/core/entities/health-care-provider.entity';

@Entity()
export class Identifier {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  code: string;

  @Column()
  desc: string;

  @Column()
  identifier: string;

  @Column({
    nullable: true,
  })
  issuer: string;

  @Column({
    nullable: true
  })
  state: string;

  @ManyToOne(type => HealthCareProvider, provider => provider.identifiers)
  provider: HealthCareProvider;

}



