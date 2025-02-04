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
  
export type Url = {
    name: string;
    text: string;
}

export type PlainText = {
    name: string;
    text: string;
}

export type Wifi = {
    name: "wifi";
    security: string;
    ssid: string;
    password: string;
}

export type Sms = {
    name: string
    phone: number;
    message: string;
}

export interface QRData {
    type: number;
    data: VCard | Url | PlainText | Wifi | Sms;
}

export interface AdvancedQRData {
    type: number;
    data: VCard | Url | PlainText | Wifi | Sms;
    fillColor: Array<number>;
    backColor: Array<number>;
    moduleShape: number;
}