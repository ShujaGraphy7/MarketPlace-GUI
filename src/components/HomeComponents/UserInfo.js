import { ethers } from "ethers";
import { formatEther } from "ethers/lib/utils";
import { useState, useEffect } from "react";
import GetAllNFTSofUser from "../ConnecttoContract/GetAllNFTSofUser";

function UserInfo() {
  let signer = null;
  let provider;
  const [address, setAddress] = useState();
  const [balance, setBalance] = useState();
  const [contractAddress, setContractAddress] = useState();

  useEffect(() => {
    connectMetamask();
    setContractAddress(); 
  },);

  const connectMetamask = async () => {
    if (window.ethereum == null) {
      console.log("MetaMask not installed; using read-only defaults");
      provider = ethers.getDefaultProvider();
    } else {
      provider = await new ethers.providers.Web3Provider(window.ethereum);
      const _address = await provider.send("eth_requestAccounts", []);
      signer = await provider.getSigner();

      setAddress(await signer.getAddress());
      const _balance = await provider.getBalance(_address[0]);
      setBalance(formatEther(_balance));
    }
  };

  const setContractAddressHandeler = (event) => {
    setContractAddress(event.target.value);
  };

  return (
    <>
      <div>
        <button
          onClick={!balance ? connectMetamask : null}
          className="m-4 p-4 bg-[#0000006e] rounded-2xl text-white font-bold px-8"
        >
          {balance ? "You are Connected" : "Connect to Get Account Details"}
        </button>
        <div>Address: {address}</div>
        <div>
          Current Balance: {balance} <b>ETH</b>
        </div>

      <div>
        <GetAllNFTSofUser currentAddress={address} contractAddress={contractAddress} />
      </div>
      </div>

      <div className="form-floating mb-3 m-5 w-[500px]">
        <input
          onChange={setContractAddressHandeler}
          type="Text"
          className="form-control block w-full my-3 px-3 py-1.5 text-s font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
          placeholder="Enter CID"
        />
      </div>
    </>
  );
}

export default UserInfo;
