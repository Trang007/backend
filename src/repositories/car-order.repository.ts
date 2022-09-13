import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {LocalMongoDataSource} from '../datasources';
import {CarOrder, CarOrderRelations} from '../models';

export class CarOrderRepository extends DefaultCrudRepository<
  CarOrder,
  typeof CarOrder.prototype.id,
  CarOrderRelations
> {
  constructor(
    @inject('datasources.LocalMongo') dataSource: LocalMongoDataSource,
  ) {
    super(CarOrder, dataSource);
  }
}
