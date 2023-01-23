import { IsBoolean, IsOptional, IsString, IsInt, IsPositive } from 'class-validator'


export class ImageBuildParamsValidator {


    @IsOptional()
    @IsString()
    dockerfile  = 'Dockerfile'


    @IsOptional()
    @IsString()
    t:string|undefined ;


    @IsOptional()
    @IsString()
    extrahosts:string|undefined;


    @IsOptional()
    @IsString()
    remote:string|undefined;

    @IsOptional()
    @IsBoolean()
    q = false ;

    @IsOptional()
    @IsBoolean()
    nocache=false;


    @IsOptional()
    @IsString()
    pull:string|undefined;

    @IsOptional()
    @IsBoolean()
    rm=true;

    @IsOptional()
    @IsInt()
    @IsPositive()
    memory : number|undefined


}