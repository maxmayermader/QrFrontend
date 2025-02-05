import { ModuleTuple } from "next/dist/build/webpack/loaders/metadata/types";


export enum QRCodeType {
    TXT = 0,
    WIFI = 2,
    VCARD = 1,
    SMS = 3
  }
  
export type VCard = {
    fn: string;
    ln: string;
    email: string;
    phone: string;
    org: string;
    title: string;
    url: string;
    bday: string;
    street: string;
    city: string;
    state: string;
    zip: string;
    country: string;
}
  
  export interface SMSData {
    type: number;
    phone: number;
    message: string;
  }
  
  export interface TextData {
    type: number;
    text: string;
  }
  
 export interface WiFiData {
    type: number;
    ssid: string;
    password: string;
    security: string;
  }

export interface AdvancedQRData {
    type: number;
    data: VCard | TextData  | WiFiData | SMSData;
    fillColor: Array<number>;
    backColor: Array<number>;
    moduleShape: number;
}