import type { Component } from 'solid-js';
import Header from './components/header'
import Footer from './components/footer'
import QRCodeGenerator from './qrCodeMaker';
import { ColorModeProvider, ColorModeScript } from "@kobalte/core";

const App: Component = () => {
  return (
    <ColorModeProvider>
    <ColorModeScript initialColorMode='dark'/>
    <div class="min-h-screen flex flex-col">
      <Header/>
      <main class="flex-grow">
        <QRCodeGenerator />
      </main>
      <Footer/>
    </div>
    </ColorModeProvider>
  );
}; 

export default App;
