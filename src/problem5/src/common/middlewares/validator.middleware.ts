import { plainToInstance } from "class-transformer";
import { validate, ValidationError } from "class-validator";
import { Request, Response, NextFunction } from "express";

export function validateDto<T extends object>(dtoClass: new () => T) {
  return async (req: Request, res: Response, next: NextFunction) => {
    const instance = plainToInstance(dtoClass, req.body ?? {});
    const errors = await validate(instance);

    if (errors.length > 0) {
      return res.status(400).json({
        message: "Validation failed",
        errors: errors.map((err) => ({
          property: err.property,
          constraints: err.constraints,
        })),
      });
    }

    req.body = instance;
    next();
  };
}

export async function validateObject<T extends object>(
  dtoClass: new () => T,
  data: object
): Promise<[T, ValidationError[]]> {
  const instance = plainToInstance(dtoClass, data ?? {});
  const errors = await validate(instance);

  if (errors.length > 0) {
    return [instance, errors];
  }

  return [instance, []];
}
