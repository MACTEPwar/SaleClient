export interface IMenuItem{
    Id:number;
    Title:string;
    Parent:IMenuItem;
    Icon:string;
    Childs:Array<IMenuItem>;
}