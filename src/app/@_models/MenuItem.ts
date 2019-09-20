import { IMenuItem } from '../@_interfaces/IMenuItem';

export class MenuItem implements IMenuItem {
    Id:number;
    Title:string;
    Parent:MenuItem = null;
    Icon:string;
    Childs:Array<MenuItem> = new Array<MenuItem>();

    constructor(id:number,title:string,icon:string){
        this.Id = id;
        this.Title = title;
        this.Icon = icon;
    }
}