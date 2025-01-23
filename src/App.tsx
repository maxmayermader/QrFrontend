import type { Component } from 'solid-js';
import Header from './components/header'
import Footer from './components/footer'
import QRCodeGenerator from './qrCodeMaker';

const App: Component = () => {
  return (
    <div class="min-h-screen flex flex-col">
      <Header/>
      <main class="flex-grow">
        <QRCodeGenerator />
      </main>
      <Footer/>
    </div>
  );
}; 

export default App;
