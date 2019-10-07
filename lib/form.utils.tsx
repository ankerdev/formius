import { ValidationError } from 'yup';
import { IValidationParameters } from './form.declarations';

export const validate = async ({
  validationRules,
  validationSchema,
  value,
}: IValidationParameters): Promise<string[]> => {
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
