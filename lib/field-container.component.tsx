import * as React from 'react';
import { IFieldContainerProps } from './form.declarations';
import { cx } from './form.utils';
import { formius } from './formius.class';

export const FieldContainer = ({
  children,
  field,
  props,
}: React.PropsWithChildren<IFieldContainerProps>) => {
  const { classNames } = formius.config;
  // @TODO Do something about label situation
  return (
    <div className={cx(classNames.fieldContainerClassName)}>
      <label>
        {props.label && <div className={cx(classNames.labelClassName)}>{props.label}</div>}
        {children}
        {field.touched && field.errors.length > 0 && (
          <div className={cx(classNames.errorContainerClassName)}>
            {field.errors.map(error => (
              <div
                className={cx(classNames.errorClassName)}
                key={error}
              >
                {error}
              </div>
            ))}
          </div>
        )}
      </label>
    </div>
  );
};
