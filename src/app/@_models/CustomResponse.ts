import { IResponse } from '../@_interfaces/IResponse';

export class CustomResponse implements IResponse{
    ProtocolIsComlete: boolean;
    ProtocolMessage: string;
    GValue:Object;
    GMessage: string;
    RValue:Object;
}