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
    phone: number;
    message: string;
  }
  
  export interface TextData {
    text: string;
  }
  
 export interface WiFiData {
    ssid: string;
    password: string;
    security: string;
  }

export interface AdvancedQRData {
    data: VCard | TextData  | WiFiData | SMSData;
    fillColor: Array<number>;
    backColor: Array<number>;
    moduleShape: number;
}

export interface QRFormatResult {
    formattedData: {
      TextData?: { text: string };
      WiFiData?: { ssid: string; password: string; security: string };
      SMSData?: { phone: number; message: string };
    };
    qrType: number;
  }