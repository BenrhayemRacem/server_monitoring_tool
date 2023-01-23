import { validate, ValidationError } from 'class-validator'
import {
    ClassConstructor,

    plainToInstance,
} from 'class-transformer'

export const validateBodyAndParse = async <T extends Object>(
    obj: any,
    cls: ClassConstructor<T>,
): Promise<[null | T, ValidationError[]]> => {
    const parsedObj = plainToInstance(cls, obj, {
        enableImplicitConversion: true,
    })

    const err = await validate(parsedObj)

    return [err.length ? null : parsedObj, err]
}
