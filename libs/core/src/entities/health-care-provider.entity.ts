import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  OneToOne,
} from 'typeorm';
import {
  Address,
  Basic,
  Identifier,
  OtherName,
  PracticeLocation,
  Taxonomy,
} from '@app/core';

@Entity()
export class HealthCareProvider {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  created_epoch: number;

  @Column()
  enumeration_type: string;

  @Column()
  last_updated_epoch: number;

  @Column()
  num: string;

  @OneToMany(type=> Address, address => address.provider)
  addresses: Address[];

  @OneToOne( type=> Basic, basic => basic.provider)
  basic: Basic;

  @OneToMany(type => Identifier, identifier => identifier.provider)
  identifiers: Identifier[];

  @OneToMany(type => OtherName, OtherName => OtherName.provider)
  otherNames: OtherName[];

  @OneToMany(type => Taxonomy, taxonomies => taxonomies.provider )
  taxonomies: Taxonomy[];

  @OneToMany(type => PracticeLocation, practiceLocation => practiceLocation.provider )
  practiceLocations: PracticeLocation[];

}

