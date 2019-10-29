import { IConfig } from './form.declarations';

// @TODO Add more stuff to this
class Formius {
  config: IConfig = {
    classNames: {},
  };

  configure(config: IConfig): void {
    this.config = config;
  }
}

export const formius = new Formius();
