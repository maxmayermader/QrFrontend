
type Url = {
    qrCodeType: 0;
    url: string;
}

type PlainText = {
    qrCodeType: 0;
    text: string;
}

type Wifi = {
    qrCodeType: 2;
    security: string;
    ssid: string;
    password: string;
}

type Sms = {
    qrCodeType: 3;
    phone: string;
    message: string;
}