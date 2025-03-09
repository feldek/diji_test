import {
  registerDecorator,
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import BigNumber from 'bignumber.js';

@ValidatorConstraint({ name: 'IsValidNumberString', async: false })
class IsValidNumberStringConstraint implements ValidatorConstraintInterface {
  validate(value: unknown) {
    if (typeof value !== 'string') {
      return false;
    }

    try {
      const number = new BigNumber(value);

      return number.isFinite() && !number.isNaN();
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (err) {
      return false;
    }
  }

  defaultMessage(args: ValidationArguments) {
    return `'${args.property}' must be a valid number string`;
  }
}

function IsValidNumberString() {
  return function (object: object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      constraints: [],
      validator: IsValidNumberStringConstraint,
    });
  };
}

export { IsValidNumberString };
