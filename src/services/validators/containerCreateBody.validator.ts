import { IsBoolean, IsNotEmpty, IsOptional, IsString } from 'class-validator'


export class ContainerCreateBodyValidator{


    @IsOptional()
    @IsBoolean()
    AttachStdin = false ;

    @IsOptional()
    @IsBoolean()
    AttachStdout= true ;

    @IsOptional()
    @IsBoolean()
    AttachStderr= true ;


    @IsNotEmpty()
    @IsString()
    Image : string|undefined ;

    @IsOptional()
    ExposedPorts : { [key: string] : {}} | undefined

    @IsOptional()
    HostConfig : {
        PortBindings :{
                [key:string ] : [{'HostPort' : string}]
        }
    } |undefined

}