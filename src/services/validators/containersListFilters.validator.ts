import { IsArray, IsEnum, IsOptional, MaxLength, MinLength } from 'class-validator'
import { ContainerHealthEnum } from '../../enums/container-enums/containerHealth.enum'
import { ContainerStatusEnum } from '../../enums/container-enums/containerStatus.enum'



export class ContainersListFiltersValidator {


    @IsOptional()
    @IsArray()
    @IsEnum(ContainerHealthEnum , {each:true})
    health : ContainerHealthEnum[] = [ContainerHealthEnum.NONE];


    @IsOptional()
    @IsArray()
    @IsEnum(ContainerStatusEnum , {each:true})
    status : ContainerStatusEnum[] |undefined;

    @IsOptional()
    @IsArray()
    @MaxLength(1)
    @MinLength(1)
    id:string[]|undefined ;

}