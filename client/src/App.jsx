import { useState, useEffect } from 'react'
import abi from "./PohaJalebi.json"
import { ethers } from "ethers"
import Memos from './components/Memos'
import Buy from './components/Buy'
import PohaJalebi from "./IndoriPohaJalebi.png";
import './App.css'

function App() {
  const [state, setState] = useState({
    provider: null,
    signer: null,
    contract: null
  })
  const [account, setAccount] = useState('Not connected');
  const [connectedNetwork, setConnectedNetwork] = useState('No Network');
  useEffect(() => {
    const template = async () => {

      const contractAddres = "0x98053749406cC5Ce97e3Bf0EA45E51E4d35fE9E2";
      const contractABI = abi.abi;

      try {

        const { ethereum } = window;
        const account = await ethereum.request({
          method: "eth_requestAccounts"
        })

        let connectedNetwork = "";
        if (ethereum && ethereum.networkVersion) {
          const networkId = Number(ethereum.networkVersion);

          switch (networkId) {
            case 80001:
              connectedNetwork = "Mumbai";
              break;
            default:
              connectedNetwork = "Restricted to Mumbai";
          }
        } else {
          connectedNetwork = "Not Connected";
        }

        window.ethereum.on("accountsChanged", () => {
          window.location.reload()
        })
        setConnectedNetwork(connectedNetwork);
        setAccount(account);
        const provider = new ethers.providers.Web3Provider(ethereum);//read the Blockchain
        const signer = provider.getSigner(); //write the blockchain

        const contract = new ethers.Contract(
          contractAddres,
          contractABI,
          signer
        )
        console.log(contract)
        setState({ provider, signer, contract });

      } catch (error) {
        console.log(error)
      }
    }
    template();
  }, []);
  return (
    <div >
      <img src={PohaJalebi} className="img-fluid" alt=".." width="100%" />
      <p style={{
        marginTop: "1px",
        marginLeft: "1px",
        color: "#888",
        fontSize: "0.9em",
        background: "#f7f7f7",
        border: "1px solid #ccc",
        borderRadius: "5px",
        padding: "0.5px",
        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
      }}>
        <small style={{ marginRight: "10px" }}>Connected Account - {account},</small>
        <small>Network - {connectedNetwork}</small>
      </p>



      <Buy state={state} />
      <Memos state={state} />

    </div>
  )
}

export default App