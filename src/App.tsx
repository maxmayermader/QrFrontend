import type { Component } from 'solid-js';
import Header from './components/header'
import Footer from './components/footer'
import logo from './logo.svg';
import styles from './App.module.css';

import QRCodeGenerator from './qrCodeMaker';

const App: Component = () => {
  return (
    <div>
      <Header/>
      <main class="flex-grow" >
        <QRCodeGenerator />
      </main>
      <Footer />
    </div>
  );
}; 

export default App;
