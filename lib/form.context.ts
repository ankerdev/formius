import * as React from 'react';
import { IFormContext } from './form.declarations';

const defaultError = (): void => console.warn('No <FormContext.Provider /> found.');

export const FormContext = React.createContext<IFormContext>({
  setField: defaultError,
  submitted: false,
});
