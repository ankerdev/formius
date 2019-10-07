import * as React from 'react';
import { IFieldContainerProps } from './form.declarations';

export const FieldContainer = ({
  children,
  field,
  props,
}: React.PropsWithChildren<IFieldContainerProps>) => {
  // @TODO Inject global classNames to elements if applicable
  return (
    <fieldset>
      <label>
        {props.label && (
          <div>
            {props.label}
          </div>
        )}
        {children}
        {field.touched && field.errors.length > 0 && (
          <div>
            {field.errors.map(error => <div key={error}>{error}</div>)}
          </div>
        )}
      </label>
    </fieldset>
  );
};
