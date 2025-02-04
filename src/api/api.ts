// api.ts
import axios from 'axios';
import { QRData } from '../types/types';

const API_URL = import.meta.env.VITE_API_URL;

interface QRCodeResponse {
  data: Blob;
}

interface CountResponse {
  data: number;
}

export const qrCodeAPI = {
  generateQRCode: async (formattedData: QRData, inputType: string): Promise<Blob> => {
    console.log("sending qr data to api");
    console.log(formattedData);
    const response = await axios.post<Blob>(
      `${API_URL}/qrcode?qr_type=${formattedData.type}`,
      {sms : formattedData.data},
    //   { "data": formattedData.payload },
      {
        responseType: 'blob',
      }
    );
    console.log("response", response);
    return response.data;
  },

  getCount: async (): Promise<number> => {
    const response = await axios.get<CountResponse>(`${API_URL}/count`);
    return response.data.data;
  }
};
