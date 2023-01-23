import { IsEnum, IsOptional, IsString } from 'class-validator'
import { NodeAvailabilityEnum } from '../../enums/node-enums/nodeAvailability.enum'
import { NodeRoleEnum } from '../../enums/node-enums/nodeRole.enum'


export class NodeUpdateBodyValidator {

    @IsOptional()
    @IsString()
    Name:string|undefined

    @IsOptional()
    Labels : { [key:string] : string} |undefined

    @IsOptional()
    @IsEnum(NodeAvailabilityEnum)
    Availability : NodeAvailabilityEnum |undefined


    @IsOptional()
    @IsEnum(NodeRoleEnum)
    Role : NodeRoleEnum |undefined
}