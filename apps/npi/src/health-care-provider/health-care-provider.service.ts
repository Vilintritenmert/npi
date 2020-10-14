import { Injectable, Logger } from '@nestjs/common';
import { Connection, EntityManager, Repository } from 'typeorm';
import { InjectConnection, InjectRepository } from '@nestjs/typeorm';
import {
  Address, Basic,
  HealthCareProvider,
  Identifier,
  OtherName, PracticeLocation,
  Taxonomy,
} from '@app/core';
import { FindProviderDTO } from '@app/core/dto/find-provider.dto';
import { PaginatedHealthCareProviderDto } from '@app/core/dto/paginated-health-care-provider.dto';

const logger = new Logger('Health Care Provider');

@Injectable()
export class HealthCareProviderService {

  public constructor (
    @InjectConnection()
    private connection: Connection,
    @InjectRepository(HealthCareProvider)
    private repository: Repository<HealthCareProvider>,
  ) {}

  private static attach (target: any, source: any, whiteList: any = []): void {
    for (const key of whiteList) {
      target[key] = source[key];
    }
  }

  private static async createProvider (providerDTO: any, manager: EntityManager)
    : Promise<HealthCareProvider> {
    const provider = new HealthCareProvider();
    HealthCareProviderService.attach(provider, providerDTO, [
      'created_epoch',
      'enumeration_type',
      'last_updated_epoch',
    ]);
    provider.num = providerDTO.number

    return manager.save(provider);
  }

  private static createAddress (
    address: any, provider: HealthCareProvider): Address {
    const newAddress = new Address();

    HealthCareProviderService.attach(newAddress, address, [
      'country_code',
      'country_name',
      'address_1',
      'address_2',
      'address_type',
      'address_purpose',
      'city',
      'postal_code',
      'state',
      'telephone_number',
      'fax_number',
    ]);
    newAddress.provider = provider;

    return newAddress;
  }

  private static createPracticeLocation (
    practiceLocation: any, provider: HealthCareProvider): PracticeLocation {
    const newPracticeLocation = new PracticeLocation();

    HealthCareProviderService.attach(newPracticeLocation, practiceLocation, [
      'country_code',
      'country_name',
      'address_1',
      'address_2',
      'address_type',
      'address_purpose',
      'city',
      'postal_code',
      'state',
      'telephone_number',
      'fax_number',
      'update_date',
    ]);
    newPracticeLocation.provider = provider;

    return newPracticeLocation;
  }

  private static createIdentifiers (
    identifierDTO: any, provider: HealthCareProvider): Identifier {
    const identifier = new Identifier();
    HealthCareProviderService.attach(identifier, identifierDTO, [
      'code',
      'desc',
      'identifier',
    ]);
    identifier.provider = provider;

    return identifier;
  }

  private static createBasic (
    basicDTO: any, provider: HealthCareProvider): Basic {
    const basic = new Basic();
    HealthCareProviderService.attach(basic, basicDTO, [
      'credential',
      'enumeration_date',
      'first_name',
      'gender',
      'last_name',
      'middle_name',
      'last_updated',
      'name',
      'name_prefix',
      'sole_proprietor',
      'status',
    ]);
    basic.provider = provider;

    return basic;
  }

  private static createOtherNames (
    otherNameDTO: any, provider: HealthCareProvider): OtherName {
    const otherName = new OtherName();

    HealthCareProviderService.attach(otherName, otherNameDTO, [
      'id',
      'code',
      'credential',
      'first_name',
      'last_name',
      'prefix',
      'type',
    ]);
    otherName.provider = provider;

    return otherName;
  }

  private static createTaxonomy (
    taxonomyDTO: any, provider: HealthCareProvider): Taxonomy {
    const taxonomy = new Taxonomy();
    HealthCareProviderService.attach(taxonomy, taxonomyDTO, [
      'code',
      'description',
      'license',
      'primary',
      'state',
      'taxonomy_group',
    ]);

    taxonomy.provider = provider;

    return taxonomy;
  }

  async create (providerDto: any) {
    await this.connection.transaction(async manager => {
      try {
        const provider = await HealthCareProviderService.createProvider(
          providerDto, manager);

        if (providerDto.addresses) {
          const addresses = providerDto.addresses.map(
            address => HealthCareProviderService.createAddress(address,
              provider));
          await manager.save(addresses);
        }

        if (providerDto.practiceLocations) {
          const practiceLocations = providerDto.practiceLocations.map(
            practiceLocation => HealthCareProviderService.createPracticeLocation(practiceLocation,
              provider));
          await manager.save(practiceLocations);
        }

        if (providerDto.basic) {
          const basic = HealthCareProviderService.createBasic(providerDto.basic,
            provider);
          await manager.save(basic);
        }

        if (providerDto.identifiers) {
          const identifiers = providerDto.identifiers.map(identify =>
            HealthCareProviderService.createIdentifiers(identify, provider));
          if (identifiers) {
            await manager.save(identifiers);
          }
        }

        if (providerDto.other_names && providerDto.other_names.length > 0) {
          const otherNames = providerDto.other_names.map(otherName =>
            HealthCareProviderService.createOtherNames(otherName, provider));
          if (otherNames) {
            await manager.save(otherNames);
          }
        }

        if (providerDto.taxonomies) {
          const taxonomies = providerDto.taxonomies.map(taxonomy =>
            HealthCareProviderService.createTaxonomy(taxonomy, provider));

          await manager.save(taxonomies);
        }

      } catch (error) {
        logger.error(error);

        throw error;
      }

    });
  }

  private buildQuery (query: FindProviderDTO) {
    const {name, code} = query;
    const providersQuery = this.repository.createQueryBuilder('provider');

    providersQuery.innerJoinAndSelect('provider.basic', 'basic')
    
    if (name) {
      providersQuery.where(' basic.name = :name ', {
          name: name,
        });
    }

    if (code) {
      providersQuery.where('num = :code', {
        code,
      });
    }

    return providersQuery;
  }

  public async findOne (query: FindProviderDTO): Promise<HealthCareProvider | null> {
    return await this.buildQuery(query).getOne();
  }

  public async find (query: FindProviderDTO): Promise<PaginatedHealthCareProviderDto> {
    const {page = 0, limit = 10} = query;
    const skippedItems = (+page - 1) * limit;

    const providersQuery = this.buildQuery(query);

    const [providers, totalCount] = await providersQuery.take(limit).
      skip(skippedItems).
      getManyAndCount();

    return {
      totalCount,
      page,
      limit,
      data: providers,
    };
  }

}
