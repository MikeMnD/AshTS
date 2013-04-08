export interface IWindow extends Window {
    requestAnimFrame(callback: any, element?: any): any;
    cancelRequestAnimFrame(callback: any, element?: any): any;
    mg: any;
    CurrentApp: any;
    DEBUG: bool;
}