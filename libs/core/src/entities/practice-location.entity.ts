import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { HealthCareProvider } from '@app/core/entities/health-care-provider.entity';

@Entity()
export class PracticeLocation {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  address_1: string;

  @Column()
  address_2: string;

  @Column()
  address_type: string;

  @Column()
  city: string;

  @Column()
  country_code: string;

  @Column()
  country_name: string;

  @Column()
  postal_code: string;

  @Column()
  state: string;

  @Column({
    nullable: true
  })
  telephone_number: string;

  @Column({
    nullable: true
  })
  fax_number: string;

  @Column()
  update_date: string;

  @ManyToOne(type=> HealthCareProvider, provider => provider.addresses)
  provider: HealthCareProvider;

}
