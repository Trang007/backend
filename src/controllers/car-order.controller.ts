import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
  response,
} from '@loopback/rest';
import {CarOrder} from '../models';
import {CarOrderRepository} from '../repositories';

export class CarOrderController {
  constructor(
    @repository(CarOrderRepository)
    public carOrderRepository : CarOrderRepository,
  ) {}

  @post('/car-orders')
  @response(200, {
    description: 'CarOrder model instance',
    content: {'application/json': {schema: getModelSchemaRef(CarOrder)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(CarOrder, {
            title: 'NewCarOrder',
            exclude: ['id'],
          }),
        },
      },
    })
    carOrder: Omit<CarOrder, 'id'>,
  ): Promise<CarOrder> {
    return this.carOrderRepository.create(carOrder);
  }

  @get('/car-orders/count')
  @response(200, {
    description: 'CarOrder model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(CarOrder) where?: Where<CarOrder>,
  ): Promise<Count> {
    return this.carOrderRepository.count(where);
  }

  @get('/car-orders')
  @response(200, {
    description: 'Array of CarOrder model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(CarOrder, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(CarOrder) filter?: Filter<CarOrder>,
  ): Promise<CarOrder[]> {
    return this.carOrderRepository.find(filter);
  }

  @patch('/car-orders')
  @response(200, {
    description: 'CarOrder PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(CarOrder, {partial: true}),
        },
      },
    })
    carOrder: CarOrder,
    @param.where(CarOrder) where?: Where<CarOrder>,
  ): Promise<Count> {
    return this.carOrderRepository.updateAll(carOrder, where);
  }

  @get('/car-orders/{id}')
  @response(200, {
    description: 'CarOrder model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(CarOrder, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(CarOrder, {exclude: 'where'}) filter?: FilterExcludingWhere<CarOrder>
  ): Promise<CarOrder> {
    return this.carOrderRepository.findById(id, filter);
  }

  @patch('/car-orders/{id}')
  @response(204, {
    description: 'CarOrder PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(CarOrder, {partial: true}),
        },
      },
    })
    carOrder: CarOrder,
  ): Promise<void> {
    await this.carOrderRepository.updateById(id, carOrder);
  }

  @put('/car-orders/{id}')
  @response(204, {
    description: 'CarOrder PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() carOrder: CarOrder,
  ): Promise<void> {
    await this.carOrderRepository.replaceById(id, carOrder);
  }

  @del('/car-orders/{id}')
  @response(204, {
    description: 'CarOrder DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.carOrderRepository.deleteById(id);
  }
}
