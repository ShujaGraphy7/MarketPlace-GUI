import { ethers } from "ethers";
import { useState } from "react";
import { Oval } from "react-loader-spinner";
import MyToken from "../../SmartContractAbi/MyToken.json";

function ListOnMarketPlace({ token, provider, erc721_rw }) {
  const [tokenPrice, setTokenPrice] = useState(0);
  const [isSubmitingForm, setIsSubmitingForm] = useState(false);
  const MarketPlaceContractAddress =
    "0x250f78EaaAceA003f21E0E947a635Fd5467734b2";

  const setTokenPriceHandeler = (event) => {
    setTokenPrice(event.target.value);
  };

  const ListNFT = async () => {
    setIsSubmitingForm(true);
    await provider.send("eth_requestAccounts", []);
    const signer = provider.getSigner();
    const erc721 = new ethers.Contract(token.token_address, MyToken, signer);

    try {
      await erc721.approve(MarketPlaceContractAddress, token.token_id);
      
      await erc721_rw.listNFT(token.token_id, tokenPrice, token.token_address);


      setIsSubmitingForm(false);
    } catch (error) {
      setIsSubmitingForm(false);
      console.log(error);
    }
  };

  console.log("sadfsadf" + token);

  return (
    <>
      <div className="w-auto flex justify-center m-8">
        <div>
          <form className=" flex items-center ">
            <label className="block">
              <div className="form-floating m-2 w-[500px]">
                <div className="w-40 mx-auto">
                  <img
                    alt={token.name}
                    src={
                      token.metadata
                        ? JSON.parse(token.metadata).image
                        : "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/1024px-No_image_available.svg.png"
                    }
                  />
                </div>
                <input
                  value={token?.token_address}
                  disabled={true}
                  type="Text"
                  className="form-control block w-full my-3 px-3 py-1.5 text-s font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                  placeholder="Enter Contract Address of NFT"
                />
                <input
                  value={token?.token_id}
                  disabled={true}
                  type="Text"
                  className="form-control block w-full my-3 px-3 py-1.5 text-s font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                  placeholder="Enter Your Token Id"
                />
                <span>{}</span>

                <input
                  onChange={setTokenPriceHandeler}
                  type="number"
                  step="0.01"
                  className="form-control block w-full my-3 px-3 py-1.5 text-s font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                  placeholder="Set Price in ETH"
                />
              </div>
            </label>
          </form>

          <button
            onClick={ListNFT}
            className="bg-blue-500 text-white p-3 block px-5 mx-auto rounded-xl h-[4rem]"
          >
            {isSubmitingForm ? (
              <Oval
                height={30}
                width={130}
                color="#fff"
                wrapperStyle={{}}
                wrapperClass=""
                visible={true}
                ariaLabel="oval-loading"
                secondaryColor="#bbb"
                strokeWidth={10}
                strokeWidthSecondary={10}
              />
            ) : (
              "List Your NFT Now"
            )}
          </button>
        </div>
      </div>
    </>
  );
}

export default ListOnMarketPlace;
