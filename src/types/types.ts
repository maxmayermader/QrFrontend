

export enum QRCodeType {
    URL = 0,
    PLAINTEXT = 1,
    WIFI = 2,
    SMS = 3
  }
  
  
export type Url = {
    name: string;
    url: string;
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
    payload: Url | PlainText | Wifi | Sms;
}