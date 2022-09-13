import {Entity, model, property} from '@loopback/repository';

@model()
export class CarOrder extends Entity {
  @property({
    type: 'string',
  })
  clientFirstname?: string;

  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'string',
  })
  clientLastname?: string;

  @property({
    type: 'string',
  })
  email?: string;

  @property({
    type: 'string',
  })
  carModel?: string;

  @property({
    type: 'number',
  })
  orderAmount?: number;


  constructor(data?: Partial<CarOrder>) {
    super(data);
  }
}

export interface CarOrderRelations {
  // describe navigational properties here
}

export type CarOrderWithRelations = CarOrder & CarOrderRelations;
