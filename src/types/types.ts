

export enum QRCodeType {
    URL = 0,
    PLAINTEXT = 1,
    WIFI = 2,
    SMS = 3
  }
  
  
export type Url = {
    url: string;
}

export type PlainText = {
    text: string;
}

export type Wifi = {
    security: string;
    ssid: string;
    password: string;
}

export type Sms = {
    phone: string;
    message: string;
}

export interface QRData {
    type: number;
    payload: Url | PlainText | Wifi | Sms;
}