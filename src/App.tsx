import type { Component } from 'solid-js';

import logo from './logo.svg';
import styles from './App.module.css';

import QRCodeGenerator from './qrCodeMaker';

const App: Component = () => {
  return (
    <div>
      <h1>QR Code Generator</h1>
      <QRCodeGenerator />
    </div>
  );
}; 

export default App;
