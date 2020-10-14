import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn} from 'typeorm';
import { HealthCareProvider } from '@app/core/entities/health-care-provider.entity';

@Entity()
export class Basic {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    nullable: true
  })
  credential: string;

  @Column()
  enumeration_date: string;

  @Column({
    nullable: true
  })
  first_name: string;

  @Column({
    nullable: true
  })
  last_name: string;

  @Column({
    nullable: true
  })
  gender: string;

  @Column()
  last_updated: string;

  @Column({
    nullable: true
  })
  middle_name: string;

  @Column()
  name: string;

  @Column({
    nullable: true
  })
  name_prefix: string;

  @Column({
    nullable: true
  })
  sole_proprietor: string;

  @Column()
  status: string;

  @OneToOne( type => HealthCareProvider, provider => provider.basic)
  @JoinColumn()
  provider: HealthCareProvider

}
