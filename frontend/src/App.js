import abi from "./contracts/chai.json";
import { useEffect, useState } from "react";
import "./App.css";
import { ethers } from "ethers";
import Buy from "./components/buy";
import Memos from "./components/memos";
import Alert from "./components/Alert";

function App() {
  const [state, setState] = useState({
    provider: null,
    signer: null,
    contract: null,
  });

  const [alert, setAlert] = useState(null);
  const [account, setAccount] = useState(null);
  const [hasMetaMask, setHasMetaMask] = useState(true);

  const contractAddress = "0x9Bd524FCb8a31Ec4725D6969E378F42E367613c3";

  const connectWallet = async () => {
    if (!window.ethereum) {
      setHasMetaMask(false);
      return;
    }

    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const address = await signer.getAddress();

      const contract = new ethers.Contract(
        contractAddress,
        abi.abi,
        signer
      );

      setAccount(address);
      setState({ provider, signer, contract });
    } catch (err) {
      if (err.code === 4001) {
        console.log("User rejected wallet connection");
        return;
      }
      setAlert({ type: "danger", msg: "Wallet connection failed" });
      setTimeout(() => setAlert(null), 5000);
    }
  };

  const switchAccount = async () => {
    try {
      await window.ethereum.request({
        method: "wallet_requestPermissions",
        params: [{ eth_accounts: {} }],
      });
    } catch (err) {
      if (err.code === 4001) {
        console.log("User cancelled account switch");
        return;
      }
      console.error("Account switch error:", err);
    }
  };

  useEffect(() => {
    if (!window.ethereum) {
      setHasMetaMask(false);
      return;
    }

    // Check existing connection (no popup)
    window.ethereum.request({ method: "eth_accounts" }).then((accounts) => {
      if (accounts.length > 0) {
        connectWallet();
      }
    });

    // Account change listener
    window.ethereum.on("accountsChanged", (accounts) => {
      if (accounts.length === 0) {
        setAccount(null);
        setState({ provider: null, signer: null, contract: null });
      } else {
        connectWallet();
      }
    });

    return () => {
      window.ethereum.removeAllListeners();
    };
  }, []);

  return (
    <div className="app-bg">
      <div className="container py-4">
        <Alert alert={alert} onClose={() => setAlert(null)} />

        <div className="wallet-bar">
          {!hasMetaMask ? (
            <span className="text-warning">
              MetaMask not detected. Install it to use Web3 features.
            </span>
          ) : account ? (
            <>
              <span>
                Connected:{" "}
                <code>
                  {account.slice(0, 6)}...{account.slice(-4)}
                </code>
              </span>
              <button
                className="btn btn-sm btn-outline-light ms-3"
                onClick={switchAccount}
              >
                Switch Account
              </button>
            </>
          ) : (
            <button
              className="btn btn-outline-light btn-sm"
              onClick={connectWallet}
            >
              Connect Wallet
            </button>
          )}
        </div>

        <Buy state={state} setAlert={setAlert}/>
        <Memos state={state} setAlert={setAlert} />
      </div>
    </div>
  );
}

export default App;
