import { IResponse } from '../@_interfaces/IResponse';

export class Response implements IResponse{
    ProtocolIsComlete: boolean;
    ProtocolMessage: string;
    GValue:Object | Array<Object>;
    GMessage: string;
  
    constructor(ProtocolIsComlete:boolean,ProtocolMessage:string,GValue:Object,GMessage:string){
      this.ProtocolIsComlete = ProtocolIsComlete;
      this.ProtocolMessage = ProtocolMessage;
      this.GValue = GValue;
      this.GMessage = GMessage;
    }
  }