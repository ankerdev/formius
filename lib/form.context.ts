import * as React from 'react';
import { IFormContext } from './form.declarations';

export const FormContext = React.createContext<IFormContext>({
  setField: () => {
    console.warn('No <FormContext.Provider /> found.');
  },
  submitted: false,
});
