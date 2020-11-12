import * as bodyParser from 'body-parser';
import express, {Express} from 'express';
import * as path from 'path';
import {Connection,
  createConnection,
  getConnectionOptions,
  ObjectType} from 'typeorm';
import {Builder,
  fixturesIterator,
  Loader,
  Parser,
  Resolver} from 'typeorm-fixtures-cli';
import {globalRouter} from '../data/Router/router.global';

/**
 * d
 */
export class Helper {
  public app: Express | null;
  private dbConnection: Connection;

  /**
   * d
   */
  public async init() {
    jest.setTimeout(10000);
    this.app = express();
    this.app.use(bodyParser.json());
    this.app.use('/api', globalRouter);
    const config = await getConnectionOptions('default');
    this.dbConnection = await createConnection(
        Object.assign({}, config, {database: process.env.MYSQL_DATABASE})
    );
  }
  /**
   * d
   */
  public resetDatabase = async () => {
    await this.dbConnection.synchronize(true);
  };
  /**
   * s
   */
  public async shutdown() {
    return this.dbConnection.close();
  }

  /**
   * s
   */
  public async loadFixtures() {
    const loader = new Loader();
    loader.load(path.resolve('./data/Fixtures/'));

    const resolver = new Resolver();
    const fixtures = resolver.resolve(loader.fixtureConfigs);
    const builder = new Builder(this.dbConnection, new Parser());

    for (const fixture of fixturesIterator(fixtures)) {
      const entity = (await builder.build(fixture)) as any;
      await this.getRepo(entity.constructor.name).save(entity);
    }
  }

  /**
   * s
   * @returngsgs
   */
  public getConnection() {
    return this.dbConnection;
  }

  /**
   * fff
   * @param target ffff
   * @return ffff
   */
  public getRepo<Entity>(target: ObjectType<Entity>) {
    return this.dbConnection.getRepository(target);
  }
}
