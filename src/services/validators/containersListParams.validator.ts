import {
    IsBoolean,
    IsInt,
    IsOptional,
    IsPositive,
    ValidateNested,
} from 'class-validator'
import { ContainersListFiltersValidator } from './containersListFilters.validator'
import { Type } from 'class-transformer'

export class ContainersListParamsValidator {
    @IsBoolean()
    @IsOptional()
    all: boolean = false

    @IsInt()
    @IsPositive()
    @IsOptional()
    limit: number | undefined

    @IsBoolean()
    @IsOptional()
    size: boolean = false

    @IsOptional()
    @ValidateNested({ each: true })
    @Type(() => ContainersListFiltersValidator)
    filters: ContainersListFiltersValidator | undefined
}
