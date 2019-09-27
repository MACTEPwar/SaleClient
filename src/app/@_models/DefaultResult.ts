import { IResult } from '../@_interfaces/IResult';

export class DefaultResult implements IResult{
    Successed:boolean;
    Message:string;
    Value:any;

    constructor(Successed:boolean,Message:string,Value:any = null){
        this.Successed = Successed;
        this.Message = Message;
        this. Value = Value;
    }
}