import { ValidationError } from 'yup';
import { IValidationArgs } from './form.declarations';

export const cx = (...args: Array<string | null | undefined | { [key: string]: any }>): string => {
  return (args.filter(arg => !!arg) as Array<string | { [key: string]: any }>)
    .reduce<string>((className, arg) => {
      switch (typeof arg) {
        case 'string':
          return `${className} ${arg}`;

        case 'object':
          return `${className} ${
            Object
              .keys(arg)
              .reduce<string>((innerClassName, key) => (
                !!arg[key]
                  ? `${innerClassName} ${key}`
                  : innerClassName
              ), '')
              .trim()
          }`;

        default:
          return className;
      }
    }, '')
    .trim();
};

export const throttle = (ms: number, callback: (() => void) & { _timeoutId?: number }): void => {
  window.clearTimeout(callback._timeoutId);
  callback._timeoutId = window.setTimeout(callback, ms);
};

export const validate = async ({
  validationRules,
  validationSchema,
  value,
}: IValidationArgs): Promise<string[]> => {
  let validationErrors: string[] = [];

  if (validationSchema) {
    try {
      // @TODO Make abortEarly togglable in config,
      // and also handle that in <FieldContainer /> given the option
      await validationSchema.validate(value, { abortEarly: false });
    } catch (e) {
      if (e instanceof ValidationError) {
        validationErrors = e.errors;
      }
    }
  }

  if (validationRules) {
    for (const rule of validationRules) {
      const errorMessage = await Promise.resolve(rule(value));
      if (errorMessage) {
        validationErrors.push(errorMessage);
      }
    }
  }

  return validationErrors;
};
