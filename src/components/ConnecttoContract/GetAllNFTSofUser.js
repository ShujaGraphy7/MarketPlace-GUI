import axios from "axios";
import React, { useEffect, useState } from "react";
import images from "../../media/images.jpeg";
import { Link } from "react-router-dom";
const GetAllNFTSofUser = (props) => {
  const [nftAmount, setNftAmount] = useState();
//   const currentAddress = "0xF65378DdA5656c91e5Ae12EB2c66BE6d8170a585";
  const AlchemyAPI = "p6bBtH18ILNLzgFrF9DPni88kSa_K5mg";
//   const contractAddress ="0x3222335408e697Cc1EafB324bfd69f0d5ce1b0D1";
  useEffect(() => {
    getnfts();
  });

  const getnfts = async () => {
    try {
      await axios({
        method: "get",
        url:
          "https://eth-goerli.g.alchemy.com/v2/" +
          AlchemyAPI +
          "/getNFTs?owner=" +
          props.currentAddress +
          "&pageSize=100&contractAddresses[]=" +
          props.contractAddress +
          "&withMetadata=false&excludeFilters[]=SPAM",

        headers: {
          accept: "application/json",
        },
      }).then((res) => {
        console.log(res.data);
        setNftAmount(res.data.totalCount);
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <div className="p-5 m-4 border-2 rounded-3xl w-fit bg-white">
        <div>
          <img
            src={images}
            alt=""
            className="rounded-3xl h-20 border-4 border-[#0000006c]"
          ></img>
        </div>
        <div>
          <span className=" flex gap-3 flex-row font-bold text-4xl text-[#000000]">
            {(props.currentAddress) ? (props.currentAddress.slice('D',6) + "..." +  (props.currentAddress.slice(-5))): props.currentAddress}
          </span>
        </div>
        <div className="mb-4 flex gap-3 flex-row font-bold text-lg text-[#000000]">
          <span>
          {/* By: {props.currentAddress.slice('',6)}...{props.currentAddress.substr(props.currentAddress.length-5)} */}
          By: {props.currentAddress}
          </span>
        </div>
        <div className="mb-6">All NFTs: {nftAmount}</div>

        <div>
          <Link
            to="/MintNFT"
            className="p-6 px-10 rounded-2xl bg-[#00000086] text-white font-bold text-lg"
            aria-current="page"
          >
            Mint Your New NFT Now
          </Link>
        </div>
      </div>
    </div>
  );
};

export default GetAllNFTSofUser;
