import { useEffect, useState } from "react";
import { ethers } from "ethers";
import "../../media/MyCss.css";
import MarketPlace from "../../SmartContractAbi/MarketPlace.json";
import axios from "axios";
import ListOnMarketPlace from "./ListOnMarketPlace";

const MarketPlaceContractAddress = "0x250f78EaaAceA003f21E0E947a635Fd5467734b2";

function NFTsOfUser() {
  const [allNFTsOfUser, setAllNFTsOfUser] = useState([]);
  const [toggle, setToggle] = useState(false);
  const [nft, setNft] = useState({});
  const [account, setAccount] = useState(null);
  const [provider, setProvider] = useState(null);
  const [erc721_rw, setErc721_rw] = useState(null);
  const [isOwmer, setIsOwmer] = useState(null);

  const [abc, setAbc] = useState(0);
  useEffect(() => {
    if (abc < 5) {
      setTimeout(() => {
        allNFT();
        setAbc(abc + 1);
      }, 500);
    }
  }, [erc721_rw]);

  const allNFT = async () => {
    setProvider(new ethers.providers.Web3Provider(window.ethereum));
    await provider.send("eth_requestAccounts", []);

    const signer = provider.getSigner();
    setErc721_rw(
      new ethers.Contract(MarketPlaceContractAddress, MarketPlace, signer)
    );
    setAccount(await signer.getAddress());

    if (account) {
      try {
        await axios
          .get(
            "https://deep-index.moralis.io/api/v2/" +
              account +
              "/nft?chain=mumbai&format=decimal",

            {
              headers: {
                accept: "application/json",
                "X-API-Key":
                  "EKCGcAtwCHT6hJkhRVEwwWf4XyNoAnRaqKi902XXalVoGcLLMkxI8zB6E39d5I0l",
              },
            }
          )
          .then((res) => {
            setAllNFTsOfUser(res?.data?.result);
          }).then(() =>{
            
          });
      } catch (error) {
        console.log(error);
      }
    }
  };

  const togglePop = (item) => {
    setNft(item);
    toggle ? setToggle(false) : setToggle(true);
  };

  return (
    <>
      <div className=" my-8 bg-gradient1 w-full" onClick={allNFT}>
        <div className=" bg-[#ffffffa7] py-10">
          <p className="font-bold text-4xl text-center text-[#00000058]">
            All Available NFT List
          </p>
        </div>
      </div>

      <div className="grid lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-1 mx-10 gap-10">
        {allNFTsOfUser?.map((item, index) => (
          <div key={index} className="shadow-xl m-8 bg-white rounded-3xl w-72">
            <div>
              <div className="`rounded-3xl rounded-b-none h-48">
                <img
                  className="object-cover w-full h-48 rounded-3xl rounded-b-none"
                  alt="nftItem"
                  src={
                    item.metadata
                      ? JSON.parse(item.metadata).image
                      : "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/1024px-No_image_available.svg.png"
                  }
                />
              </div>
              <div className="py-4 pb-6 px-6 text-lg font-bold">
                <div className="mb-4 mt-2">
                  NFT Id: <span className="font-bold border-[#00000027] border-2 p-2 px-3 mx-2 rounded-full">{item?.token_id}</span>
                </div>
                <h1>
                  NFT Name: 
                  <span>
                    {item.metadata
                      ?" "+ JSON.parse(item.metadata).name
                      : " Unavailable"}
                  </span>
                </h1>

                <h1>
                  Source Address: 
                  <span className="font-bold">
                    <t />
                    {item.token_address
                      ?" " + item.token_address.slice("", 6) +
                        "..." +
                        item.token_address.slice(-5)
                      : " " + item.token_address}
                  </span>
                </h1>
                <br/>
                <hr />

                <div>
                  {isOwmer?
                  (""):
                  ("")}
                  <button
                    onClick={() => togglePop(item)}
                    className="bg-blue-500 text-white p-3 block px-10 mx-auto my-5 rounded-xl h-[4rem]"
                  >
                    List Now
                  </button>
                </div>
              </div>
            </div>

            {toggle ? (
              <>
                <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                  <div className="relative w-auto my-6 mx-auto max-w-3xl">
                    <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                      <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                        <h3 className="text-3xl font-semibold">
                          Token Name: {item.name}
                        </h3>
                      </div>
                      <div className="relative p-6 flex-auto">
                        {toggle && (
                          <ListOnMarketPlace
                            token={nft}
                            provider={provider}
                            erc721_rw={erc721_rw}
                          />
                        )}
                      </div>
                      <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                        <button
                          className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                          type="button"
                          onClick={() => togglePop(item)}
                        >
                          Close
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="opacity-25 fixed inset-0 z-40 bg-[#0000005d]"></div>
              </>
            ) : null}
          </div>
        ))}
      </div>
    </>
  );
}

export default NFTsOfUser;

// {"token_address":"0x879279a63dfb64ff0ae5342117a4ced69ba0880b",
// "token_id":"3","amount":"1",
// "owner_of":"0xb86f8b8725e2b67625a906f163d7a993cfebfe7c",
// "token_hash":"5f502723dd3b60413ee565fba661f960",
// "block_number_minted":"31791850","block_number":"31791850",
// "contract_type":"ERC721","name":"MyToken","symbol":"MTK",
// "token_uri":"https://ipfs.moralis.io:2053/ipfs/QmVYcrsijnHSo8KCRTuJk9t31bb1Bm8dVQuWQEn8ivPP4s",
// "metadata":"{\"name\":\"NFTTest002\",\"description\":\"testing nft 002 \",\"image\":\"https://ipfs.io/ipfs/QmPH8eQeVcmWPNGKG2tCb3aee36SAhoFQQpMDDruiswNgy\"}",
// "last_token_uri_sync":"2023-02-06T17:37:29.492Z"
// ,"last_metadata_sync":"2023-02-07T06:10:27.786Z",
// "minter_address":"0xf65378dda5656c91e5ae12eb2c66be6d8170a585"}

// []: 3,   ID
// 0xb86f8B8725e2B67625A906f163D7a993cfEbFE7c   Owner
// ,5000  price
// ,0x879279a63DFb64ff0AE5342117a4cED69BA0880b  NFTSource
// ,true IsListed
// ,false available



