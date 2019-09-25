export class Test{
    log:boolean;
    info:boolean;
    error:boolean;
    trace:boolean;

    constructor(log:boolean = true,info:boolean=true,error:boolean = false,trace:boolean = false){
        this.log = log;
        this.info = info;
        this.error = error;
        this.trace = trace;
    }
}