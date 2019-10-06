import { IGlobalClassNames } from './form.declarations';

// @TODO
class Formius {
  config: IGlobalClassNames = {};

  configure(config: IGlobalClassNames): void {
    this.config = config;
  }
}

export const formius = new Formius();
