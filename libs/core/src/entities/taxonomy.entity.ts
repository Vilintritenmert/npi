import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { HealthCareProvider } from '@app/core/entities/health-care-provider.entity';

@Entity()
export class Taxonomy {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  code: string;

  @Column({
    nullable: true,
  })
  description: string;

  @Column()
  license: string;

  @Column({default: true})
  primary: boolean;

  @Column()
  state: string;

  @Column({
    nullable: true,
  })
  taxonomy_group: string;

  @ManyToOne(type => HealthCareProvider, provider => provider.taxonomies)
  provider: HealthCareProvider;
}
