import "./App.css";
import Header from "./components/Header";
import Swap from "./components/Swap";
import Tokens from "./components/Tokens";
import { Routes, Route } from "react-router-dom";
import { useConnect, useAccount } from "wagmi";
import { MetaMaskConnector } from "wagmi/connectors/metaMask";

function App() {
  const { address, isConnected } = useAccount();
  const { connect, connectors } = useConnect({
    connectors: [new MetaMaskConnector()],  // Inicializa correctamente los conectores en un array
  });

  // Encuentra el conector de MetaMask específicamente, o usa el primer conector disponible
  const connectMetaMask = async () => {
    const metaMaskConnector = connectors.find(
      connector => connector instanceof MetaMaskConnector
    );
    try {
      await connect(metaMaskConnector || connectors[0]);
    } catch (error) {
      console.error("Error connecting to MetaMask:", error);
    }
  };

  return (
    <div className="App">
      <Header connect={connect} isConnected={isConnected} address={address} />
      <div className="mainWindow">
        <Routes>
          <Route path="/" element={<Swap isConnected={isConnected} address={address} />} />
          <Route path="/tokens" element={<Tokens />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
