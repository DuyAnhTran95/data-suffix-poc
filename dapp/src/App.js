import React, { useState } from "react";

import { BaseContract } from "@ethersproject/contracts";
import { hexlify } from "@ethersproject/bytes";
import contract from "./SuffixData.json";
import deployed from "./deployed_addresses.json";

const abi = contract.abi;

const contractAddress = deployed["SuffixData#SuffixData"];


function App() {
  const ethers = require("ethers")
  const provider_Metamask = new ethers.providers.Web3Provider(window.ethereum)

  // Use the useState hook function to add state variables to a functional component.
  const [blockNumber, setBlockNumber] = useState(null)
  const [txSent, setTxSent] = useState(null)

  const handleButton2 = async () => {
    const latest_block = await provider_Metamask.getBlockNumber("latest")
    setBlockNumber(latest_block)
  }

  // Handle the form submissions to send the transactions
  const handleSubmitWeb3 = async (e) => {
    e.preventDefault()
    const data = new FormData(e.target)
    const number = data.get("number")
    const suffix = data.get("data")
    sendTransaction(number, suffix)
  }

  // Send the transaction using either the Web3Provider or InfuraProvider
  const sendTransaction = async (number, data, signer = null) => {
    if (signer == null) {
      // Web3 Provider
      if (!window.ethereum) console.error("No wallet found!")
      else {
        await window.ethereum.send("eth_requestAccounts")
        const provider = new ethers.providers.Web3Provider(window.ethereum)
        const signer = provider.getSigner()
        console.log(hexlify(data));
        const contract = new BaseContract(contractAddress, abi, signer, data)
        console.log(contract)
        console.log("suffixData", contract.suffixData)
        const tx = await contract.sendData(number)
        console.log("tx", tx)
        setTxSent("Transaction initiated! Tx hash: " + tx.hash)
      }
    } 
  }

  // Configure the app frontend
  return (
    <div className="App">
      <header className="App-header">
        <h3> Press one of the buttons to find out the latest block number: </h3>
        <div>
          <button onClick={handleButton2}>Web3Provider</button>
          <p>{blockNumber}</p>
        </div>
        <h3> Fill out the form to send a transaction via Web3Provider: </h3>
        <div>
          <form onSubmit={handleSubmitWeb3}>
            <input type="number" name="number" placeholder="number" />
            <input type="text" name="data" placeholder="data" />
            <input type="submit" value="Send w/ Web3Provider" />
          </form>
          <p>{txSent}</p>
        </div>
        <h3> Fill out the form to send a transaction via InfuraProvider: </h3>
      </header>
    </div>
  )
}

export default App