import { ethers } from "ethers";
import { useState, useEffect } from "react";
import Header from "../Header";
import Listed from "../Listing/listed";
import NFTsOfUser from "../Listing/NFTsOfUser";

function User() {
  let signer = null;
  const [provider, setProvider] = useState();

  useEffect(() => {
    if(!window.ethereum)
    connectMetamask();
  });

  const connectMetamask = async () => {
    if (window.ethereum == null) {
      console.log("MetaMask not installed; using read-only defaults");
      setProvider(ethers.getDefaultProvider());
    } else {
      setProvider(new ethers.providers.Web3Provider(window.ethereum));
      signer = provider.getSigner();
      
    }
  };

  return (
    <>
      <Header />
        <div>
          <Listed/>
        </div>
        <div>
          <NFTsOfUser/>
        </div>
    </>
  );
}

export default User;
