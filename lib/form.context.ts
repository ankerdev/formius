import * as React from 'react';
import { IFormContext } from './form.declarations';

const errorMessage: string = 'No <FormContext.Provider /> found.';

export const FormContext = React.createContext<IFormContext>({
  getValues: () => {
    console.warn(errorMessage);
    return {};
  },
  setValue: () => {
    console.warn(errorMessage);
  },
  submitted: false,
});
