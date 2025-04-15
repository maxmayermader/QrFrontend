// api.ts
import axios from 'axios';
import { WiFiData, TextData, SMSData, VCard, QRFormatResult } from '../types/types';
import { NextResponse } from 'next/server';
import { get } from '@vercel/edge-config';

const API_URL = import.meta.env.VITE_API_URL;
export const config = { matcher: '/count' };

interface QRCodeResponse {
  data: Blob;
}

interface CountResponse {
  data: number;
}

export const qrCodeAPI = {
  generateQRCode: async (formattedData: QRFormatResult, inputType: number): Promise<Blob> => {
    console.log("sending qr data to api");
    console.log(formattedData);
    const response = await axios.post<Blob>(
        `${API_URL}/qrcode?qr_type=${inputType}`,
        // Send the inner data object directly
        formattedData.formattedData.SMSData || 
        formattedData.formattedData.WiFiData ||
        formattedData.formattedData.TextData,
        {
            responseType: 'blob',
        }
    );
    return response.data;
},


  getCount: async (): Promise<number> => {
    const response = await axios.get<CountResponse>(`${API_URL}/count`);
    return response.data.data;
  }
};

export async function middleware() {
  const greeting = await get('greeting');
  // NextResponse.json requires at least Next v13.1 or
  // enabling experimental.allowMiddlewareResponseBody in next.config.js
  return NextResponse.json(greeting);
}
