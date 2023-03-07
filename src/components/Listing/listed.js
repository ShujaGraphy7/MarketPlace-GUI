import { BigNumber, ethers } from "ethers";
import { useEffect, useState } from "react";
import MarketPlace from "../../SmartContractAbi/MarketPlace.json";

const MarketPlaceContractAddress = "0x250f78EaaAceA003f21E0E947a635Fd5467734b2";
function Listed() {
  const [listedNFTSlist, setListedNFTSlist] = useState([]);
  const [userListed, setUserListed] = useState(null);
  const [toggleStatus, setToggleStatus] = useState(false);
  const [selectedNFT, setSelectedNFT] = useState(null);
  const [erc721_rw, seterc721_rw] = useState();
  const [price, setPrice] = useState(null);
  const [userListedURI, setUserListedURI] = useState([]);

  let provider;

  const [abc, setAbc] = useState(0);
  useEffect(() => {
    if (abc < 8) {
      setTimeout(() => {
        setAbc(abc + 1);
        listedNFTs();
      }, 600);
    }
  }, [erc721_rw]);

  const listedNFTs = async () => {
    
    provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();

    seterc721_rw(
      new ethers.Contract(MarketPlaceContractAddress, MarketPlace, signer)
    );

    setListedNFTSlist(await erc721_rw.listAllAvailableNFTs());
    setUserListed(listedNFTSlist);

    const userlist = [];
    
    if (listedNFTSlist.length > 0) {
      setUserListedURI([]);
    setUserListed([]);
      for (var i = 0; i < listedNFTSlist?.length; i++) {
        if (
          listedNFTSlist[i].owner == (await signer.getAddress()).toString()
        ) {
          userlist.push(listedNFTSlist[i]);
        }
      }
    }

    if (userlist.length > 0) {
      setUserListed(userlist);
    }

    let c = [];
    setUserListedURI([])
    userListed.map(async (item, id) => {

      if (item.URI.toString().substring(0, 4) == "http") {
        let response = await fetch(item.URI);
        let responseJson = await response.json();
        c[id] = { data: item, meta: responseJson };
        setUserListedURI((oldUserListedURI) => [...oldUserListedURI, c[id]]);
      } else {
        c[id] = { data: item, meta: "responseJson" };
        setUserListedURI((oldUserListedURI) => [...oldUserListedURI, c[id]]);
      }
    });
  };

  const togglePop = async (item) => {
    setSelectedNFT(item);
    toggleStatus ? setToggleStatus(false) : setToggleStatus(true);
  };

  const unListNow = async () => {
   
    await erc721_rw.unlistNFT(
      BigNumber.from(selectedNFT.data.id),
      selectedNFT.data.NFTSource
    );
    setToggleStatus(false)
  };

  const setPriceHandeler = (e) => {
    setPrice(e.target.value);
  };

  const UpdatePrice = async () => {
    
    await erc721_rw.updatePriceOfNFT(
      BigNumber.from(selectedNFT.data.id),
      BigNumber.from(price),
      selectedNFT.data.NFTSource
    );
    setToggleStatus(false)
  };

  return (
    <>
      <div className=" my-8 bg-user-header w-full" onClick={listedNFTs}>
        <div className=" bg-[#ffffffa7] py-10">
          <p className="font-bold text-4xl text-center text-[#00000058]">
            Listed NFTs
          </p>
        </div>
      </div>

      <div className="grid lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-1 mx-10">
        {!userListed
          ? "Listed Nft List is Empty"
          : userListedURI?.map((item, index) => (
              <div
                key={index}
                className="shadow-xl m-8  bg-white rounded-3xl w-72 mx-auto"
              >
                <div className={`rounded-3xl rounded-b-none h-48`}>
                  {item.data.URI.substring(0, 4) === "http" ? (
                    <img
                      className="object-cover w-full h-48 rounded-3xl rounded-b-none"
                      src={item?.meta?.image}
                      alt=""
                    />
                  ) : (
                    <img
                      className="object-cover w-full h-48 rounded-3xl rounded-b-none"
                      src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/1024px-No_image_available.svg.png"
                      alt=""
                    />
                  )}
                </div>

                <div className="py-4 pb-6 px-6">
                  <div className="mb-4 mt-2">
                    <span className="font-bold text-lg">
                      NFT Id:
                      <span className="font-bold border-[#00000027] border-2 p-2 px-3 mx-2 rounded-full">
                        {parseInt(item?.data?.id)}
                      </span>
                    </span>
                  </div>

                  <div className="mb-4 mt-2">
                    <span className="font-bold text-lg">
                      Source Address:
                      {item?.data?.NFTSource
                        ? item?.data?.NFTSource.slice("", 6) +
                          "..." +
                          item?.data?.NFTSource.slice(-5)
                        : item?.data?.NFTSource}
                    </span>
                  </div>

                  <div className="flex justify-start font-bold">
                    <div>
                      <span>NFT Price: </span>

                      <span>{parseInt(item?.data?.price)}</span>
                    </div>
                  </div>
                  <button
                    onClick={() => togglePop(item)}
                    className="bg-blue-500 text-white p-3 block px-10 mx-auto my-5 rounded-xl h-[4rem]"
                  >
                    Unlist / Update Price
                  </button>
                </div>

                {toggleStatus ? (
                  <div
                    className="relative z-10"
                    aria-labelledby="modal-title"
                    role="dialog"
                    aria-modal="true"
                  >
                    <div className="fixed inset-0 bg-gray-900 bg-opacity-25 backdrop-blur-sm transition-opacity"></div>

                    <div className="fixed inset-0 z-10 overflow-y-auto">
                      <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                        <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                          <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                            <div className="sm:flex sm:items-start">
                              {price ? (
                                <div className="mx-auto flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-full bg-blue-100 sm:mx-0 sm:h-10 sm:w-10">
                                  <svg
                                    className="h-6 w-6"
                                    fill="#0091ff"
                                    version="1.1"
                                    id="Layer_1"
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="-51.2 -51.2 614.40 614.40"
                                    stroke="#0091ff"
                                  >
                                    <path d="M511.999,234.558l-0.002-165.43C511.998,31.01,480.987,0,442.869,0H277.441c-2.829,0-5.541,1.124-7.541,3.124 l-32.337,32.337c-5.529-0.46-11.108-0.832-16.73-1.104c-71.146-3.446-131.857,8.964-154.665,31.614 c-9.137,9.075-10.756,18.199-10.507,24.253c0.904,21.842,27.038,41.488,72.317,54.821L20.177,252.847 C7.166,265.858,0.001,283.218,0.001,301.728c0,18.511,7.166,35.87,20.176,48.879l140.059,140.06h-10.902 c-5.89,0-10.667,4.775-10.667,10.667c0,5.89,4.776,10.667,10.667,10.667h213.331c5.89,0,10.667-4.776,10.667-10.667 c0-5.891-4.776-10.667-10.667-10.667H260.309l248.565-248.565C510.876,240.1,511.999,237.387,511.999,234.558z M76.977,89.342 c-0.039-0.959-0.16-3.88,4.225-8.235C95.91,66.5,144.739,52.399,217.456,55.568l-72.098,72.098 C95.895,115.222,77.335,97.991,76.977,89.342z M244.068,476.737c-8.981,8.982-20.985,13.929-33.796,13.929 c-12.813,0-24.815-4.946-33.795-13.929L35.261,335.521c-8.982-8.98-13.929-20.982-13.929-33.794 c0-12.813,4.947-24.815,13.929-33.796L245.552,57.642c30.865,3.228,59.361,9.437,82.052,18.02 c15.049,5.693,25.198,11.572,31.565,16.862c-7.687,7.721-12.448,18.359-12.448,30.091c0,3.309,0.391,6.528,1.108,9.622 c0.048,0.262,0.112,0.522,0.181,0.781c0.027,0.111,0.052,0.223,0.081,0.334c0.002,0.009,0.005,0.018,0.009,0.026 c4.781,18.332,21.478,31.902,41.287,31.902c23.525,0,42.665-19.139,42.665-42.666c0-23.527-19.139-42.668-42.665-42.668 c-3.784,0-7.452,0.501-10.947,1.43c-9.035-9.546-23.582-18.214-43.289-25.668c-20.087-7.598-44.272-13.446-70.477-17.188 l17.185-17.186h161.009c26.354,0,47.795,21.441,47.795,47.795l0.002,161.011L244.068,476.737z M389.31,104.461 c-0.044-1.06-0.153-2.113-0.311-3.162c0.13-0.002,0.257-0.02,0.388-0.02c11.762,0,21.331,9.571,21.331,21.334 c0,11.762-9.569,21.332-21.331,21.332c-7.336,0-13.817-3.723-17.658-9.378C386.604,123.999,389.647,112.639,389.31,104.461z" />
                                    <path d="M457.45,90.13c-5.621,1.761-8.751,7.746-6.99,13.367c1.939,6.192,2.923,12.623,2.923,19.116 c0,35.289-28.708,63.997-63.996,63.997c-35.29,0-63.998-28.708-63.998-63.997c0-5.891-4.775-10.667-10.667-10.667 c-5.891,0-10.667,4.775-10.667,10.667c0,47.051,38.279,85.33,85.331,85.33c47.05,0,85.329-38.279,85.329-85.33 c0-8.658-1.311-17.236-3.899-25.493C469.056,91.498,463.07,88.368,457.45,90.13z" />
                                    <path d="M443.241,81.562c2.657,0,5.319-0.988,7.389-2.975c4.247-4.081,4.383-10.833,0.302-15.082 c-1.75-1.823-3.591-3.578-5.473-5.215c-4.444-3.869-11.181-3.402-15.05,1.041c-3.868,4.443-3.402,11.18,1.042,15.049 c1.405,1.223,2.783,2.538,4.097,3.904C437.642,80.465,440.438,81.562,443.241,81.562z" />
                                    <path d="M311.212,327.954c1.967-2.759,3.727-5.595,5.223-8.469c9.554-18.349,7.793-40.86-4.486-57.347 c-11.115-14.925-28.314-21.81-46.006-18.416c-12.667,2.429-24.743,9.281-36.422,15.908c-2.682,1.522-5.216,2.96-7.764,4.352 c-15.616,8.521-30.525,9.123-39.884,1.609c-7.723-6.202-10.293-16.948-6.878-28.745c0.987-3.405,2.737-6.727,5.044-9.897 l17.643,17.645c2.083,2.082,4.813,3.124,7.543,3.124c2.73,0,5.458-1.041,7.541-3.124c4.165-4.164,4.166-10.918,0-15.085 l-17.014-17.017c7.679-5.078,16.419-8.945,24.505-10.931c5.721-1.406,9.218-7.184,7.811-12.906 c-1.407-5.721-7.184-9.22-12.906-7.811c-11.379,2.797-23.941,8.377-34.804,16.251l-8.151-8.151 c-4.164-4.164-10.917-4.165-15.085,0c-4.166,4.164-4.166,10.918-0.001,15.085l7.666,7.667 c-4.645,5.781-8.256,12.211-10.285,19.216c-5.805,20.049-0.436,39.71,14.014,51.313c16.302,13.089,40.025,13.27,63.458,0.483 c0.819-0.447,1.639-0.909,2.46-1.364l47.167,47.167c-10.256,8.062-21.897,12.006-29.134,9.714 c-5.617-1.78-11.611,1.332-13.39,6.949c-1.779,5.616,1.332,11.611,6.948,13.389c3.596,1.138,7.325,1.669,11.119,1.669 c13.508-0.001,27.808-6.724,39.561-16.618l11.264,11.265c2.083,2.083,4.813,3.124,7.541,3.124c2.731,0,5.46-1.042,7.542-3.124 c4.165-4.165,4.165-10.918,0.001-15.085L311.212,327.954z M297.514,309.63c-0.523,1.005-1.088,1.986-1.672,2.953l-41.935-41.936 c5.562-2.77,11.006-5.005,16.054-5.973c9.611-1.842,18.676,1.877,24.88,10.206C302.266,284.85,303.314,298.491,297.514,309.63z" />
                                    <path d="M136.523,363.737c-4.164-4.166-10.918-4.169-15.085-0.004c-4.166,4.164-4.167,10.918-0.003,15.086l4.364,4.366 c2.083,2.084,4.815,3.126,7.545,3.126c2.729,0,5.458-1.04,7.54-3.122c4.166-4.164,4.169-10.918,0.004-15.086L136.523,363.737z" />
                                    <path d="M232.902,414.863l-22.628,22.629l-45.255-45.257c-4.165-4.165-10.919-4.165-15.085-0.001 c-4.166,4.165-4.166,10.919-0.001,15.086l45.257,45.257c4.159,4.158,9.621,6.238,15.085,6.238c5.462,0,10.926-2.079,15.086-6.238 l22.628-22.628c4.165-4.165,4.165-10.919,0-15.086C243.822,410.697,237.068,410.697,232.902,414.863z" />
                                  </svg>
                                </div>
                              ) : (
                                <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                                  <svg
                                    className="h-6 w-6 text-red-600"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth="1.5"
                                    stroke="currentColor"
                                    aria-hidden="true"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
                                    />
                                  </svg>
                                </div>
                              )}
                              <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                                <div
                                  className={`rounded-3xl rounded-b-none h-56`}
                                >
                                  <img
                                    className="object-cover w-full h-56 rounded-3xl"
                                    src={item?.meta?.image}
                                    alt=""
                                  />
                                </div>
                                <h3
                                  className="text-lg font-medium leading-6 text-gray-900"
                                  id="modal-title"
                                >
                                  Are you sure to unlist your NFT?
                                </h3>
                                <div className="mt-2">
                                  <p className="text-sm text-gray-500">
                                    Are you sure you want to Unlist your NFT?
                                    your will be permanently removed. This
                                    action cannot be undone. but you can List
                                    them back from your available list.
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="mx-20 flex gap-5">
                            <div>
                              <p>
                                Token id:{" "}
                                <b> {parseInt(selectedNFT?.data?.id)}</b>
                              </p>
                            </div>

                            <div>
                              <p>
                                Current Price:{" "}
                                <b>{parseInt(selectedNFT?.data.price)}</b>
                              </p>
                            </div>
                          </div>
                          <input
                            onChange={setPriceHandeler}
                            type="Text"
                            className="mx-auto block my-3 p-3 text-s font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                            placeholder="Set New Price"
                          />

                          <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                            {price ? (
                              <button
                                disabled={true}
                                type="button"
                                className="inline-flex w-full justify-center rounded-md border border-transparent bg-red-300 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm"
                              >
                                Unlist Now
                              </button>
                            ) : (
                              <button
                                onClick={unListNow}
                                type="button"
                                className="inline-flex w-full justify-center rounded-md border border-transparent bg-red-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm"
                              >
                                Unlist Now
                              </button>
                            )}

                            <button
                              onClick={() => togglePop(item)}
                              type="button"
                              className="mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                            >
                              Cancel
                            </button>

                            {price ? (
                              <button
                                onClick={UpdatePrice}
                                type="button"
                                className="mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                              >
                                Update Price
                              </button>
                            ) : (
                              <button
                                disabled="true"
                                type="button"
                                className="mt-3 inline-flex w-full justify-center rounded-md border border-gray-200 bg-gray-100 px-4 py-2 text-base font-medium text-gray-400 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                              >
                                Update Price
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : null}
              </div>
            ))}
      </div>
    </>
  );
}

export default Listed;
