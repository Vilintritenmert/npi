import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { HealthCareProvider } from '@app/core/entities/health-care-provider.entity';

@Entity()
export class OtherName {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  code: string;

  @Column({
    nullable: true
  })
  credential: string;

  @Column()
  first_name: string;

  @Column()
  last_name: string;

  @Column({
    nullable: true
  })
  prefix: string;

  @Column()
  type: string;

  @ManyToOne(type => HealthCareProvider, provider=> provider.otherNames)
  provider: HealthCareProvider;

}
