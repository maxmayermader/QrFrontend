

export enum QRCodeType {
    TXT = 0,
    VCARD = 1,
    WIFI = 3,
    SMS = 4
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
    phone: string;
    message: string;
}

export interface QRData {
    type: number;
    data: Url | PlainText | Wifi | Sms;
}