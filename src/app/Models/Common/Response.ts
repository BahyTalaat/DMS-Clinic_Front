
export class ResponseDto{
    isError:boolean=false;
    status?:string;
    errorMessage?:string;
    serverParams:any;
}


export class QueryParamsDto {
    key!: string;
    value: any;
}

export class ErrorResponseDto{
    message?:string;
    errors:any
}