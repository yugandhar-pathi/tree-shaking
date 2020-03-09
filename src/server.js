import { Factory, Model, Server } from 'miragejs';
import faker from 'faker';

export function makeServer({ environment = 'development ' } = {}) {
  const server = new Server({
    environment,

    logging: true,

    models: {
      user: Model
    },

    factories: {
      user: Factory.extend({
        id(i) {
          return i + 1;
        },
        name(i) {
          return `user${i}`;
        },
        description() {
          return faker.lorem.sentence();
        },
        region() {
          return faker.random.arrayElement(['us-east', 'us-west']);
        },
        isRestorable() {
          return faker.random.boolean();
        },
        clientUsernames() {
          return [faker.internet.userName()];
        }
      })
    },

    seeds(svr) {
      // svr.createList('store', 5);
      svr.create('user', {
        name: 'User1',
        description: 'Test user'
      });

      svr.create('user', {
        name: 'User2',
        description: 'Exchange user'
      });
    },

    routes() {
      this.get('/users', (schema, request) => {
        return schema.users.all();
      });
    }
  });

  return server;
}
