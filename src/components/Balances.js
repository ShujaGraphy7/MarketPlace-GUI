import { ethers } from "ethers";
import React, { useEffect, useState } from "react";
import MarketPlace from "../SmartContractAbi/MarketPlace.json";
const MarketPlaceContractAddress = "0x250f78EaaAceA003f21E0E947a635Fd5467734b2";

function Balances() {
  const [listedNFTSlist, setListedNFTSlist] = useState([]);
  const [toggleStatus, setToggleStatus] = useState(false);
  const [selectedNFT, setSelectedNFT] = useState(null);
  const [erc721_rw, setErc721_rw] = useState(null);
  const [address, setAddress] = useState(null);
  const [userListedURI, setUserListedURI] = useState([]);
  let provider = null;
  let signer = null;
  const [abc, setAbc] = useState(0);
  useEffect(() => {
    if (abc < 5) {
      setTimeout(() => {
        setAbc(abc + 1);
        listedNFTs();
      }, 500);
    }
  }, [erc721_rw]);

  const listedNFTs = async () => {
    provider = new ethers.providers.Web3Provider(window.ethereum);
    signer = provider.getSigner();

    setAddress(await signer.getAddress());

    setErc721_rw(
      new ethers.Contract(MarketPlaceContractAddress, MarketPlace, signer)
    );

    setListedNFTSlist(await erc721_rw?.listAllAvailableNFTs());

    let c = [];
    setUserListedURI([]);
    listedNFTSlist.map(async (item, id) => {
      if (item.URI.toString().substring(0, 5) === "https") {
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
  const togglePop = (item) => {
    toggleStatus ? setToggleStatus(false) : setToggleStatus(true);
    setSelectedNFT(item);
  };

  const buyNow = async () => {

    await erc721_rw.buyNFT(
      parseInt(selectedNFT?.data.id),
      selectedNFT?.data.NFTSource.toString(),
      selectedNFT?.data.owner.toString(),
      { value: parseInt(selectedNFT.data.price).toString() }
    );

    let c = [];
    setUserListedURI([]);
    listedNFTSlist.map(async (item, id) => {
      if (item.URI.toString().substring(0, 5) === "https") {
        let response = await fetch(item.URI);
        let responseJson = await response.json();
        c[id] = { data: item, meta: responseJson };
        setUserListedURI((oldUserListedURI) => [...oldUserListedURI, c[id]]);
      } else {
        c[id] = { data: item, meta: "responseJson" };
        setUserListedURI((oldUserListedURI) => [...oldUserListedURI, c[id]]);
      }
    })
      setToggleStatus(false);
    
  };

  return (
    <>
      <div
        className=" my-8 bg-user-header w-full rounded-3xl cursor-pointer"
        onClick={listedNFTs}
      >
        <div className=" bg-[#ffffffa7] py-10 rounded-3xl">
          <p className="font-bold text-4xl text-center text-[#00000090]">
            Listed NFTs
          </p>
        </div>
      </div>

      <div className=" grid md:gap-20 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 mx-10">
        {!userListedURI
          ? "Listed Nft List is Empty"
          : userListedURI?.map((item, index) => (
              <div
                key={index}
                className="mx-auto shadow-xl m-8 bg-white rounded-3xl w-72"
              >
                <div className={`rounded-3xl rounded-b-none h-48`}>
                  {item.data.URI.substring(0, 4) === "http" ? (
                    <img
                      className="object-cover w-full h-48 rounded-3xl rounded-b-none"
                      src={item.meta.image}
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
                      <span className="font-bold border-[#00000016] border-2 p-2 px-3 mx-2 rounded-full">
                        {parseInt(item?.data?.id)}
                      </span>
                    </span>
                  </div>

                  <div className="mb-4 mt-2">
                    <span className="font-bold text-lg">
                      Source Address:{" "}
                      {item?.data?.NFTSource
                        ? item?.data?.NFTSource.slice("", 6) +
                          "..." +
                          item?.data?.NFTSource.slice(-5)
                        : item?.data?.NFTSource}
                    </span>
                  </div>

                  <div className="flex px-2">
                    <div className="my-auto font-bold text-lg">
                      <span>NFT Price: </span>
                      <span>{parseInt(item?.data?.price)}</span>
                    </div>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      aria-label="Ethereum"
                      role="img"
                      viewBox="-51.2 -51.2 614.40 614.40"
                      width="44px"
                      height="44px"
                      transform="matrix(1, 0, 0, 1, 0, 0)"
                    >
                      <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                      <g
                        id="SVGRepo_tracerCarrier"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      ></g>
                      <g id="SVGRepo_iconCarrier">
                        <rect
                          width="512"
                          height="512"
                          rx="15%"
                          fill="#ffffff00"
                        ></rect>
                        <path fill="#3C3C3B" d="m256 362v107l131-185z"></path>
                        <path
                          fill="#343434"
                          d="m256 41l131 218-131 78-132-78"
                        ></path>
                        <path
                          fill="#8C8C8C"
                          d="m256 41v158l-132 60m0 25l132 78v107"
                        ></path>
                        <path fill="#141414" d="m256 199v138l131-78"></path>
                        <path fill="#393939" d="m124 259l132-60v138"></path>
                      </g>
                    </svg>{" "}
                  </div>
                  {item?.data?.owner === address ? (
                    <button
                      disabled={true}
                      className="bg-blue-200 text-white p-3 block px-10 mx-auto my-5 rounded-xl h-[4rem]"
                    >
                      You are Owner
                    </button>
                  ) : (
                    <button
                      onClick={() => togglePop(item)}
                      className="bg-blue-500 text-white p-3 block px-10 mx-auto my-5 rounded-xl h-[4rem]"
                    >
                      Buy Now
                    </button>
                  )}

                  {toggleStatus ? (
                    <div
                      className="relative z-10"
                      aria-labelledby="modal-title"
                      role="dialog"
                      aria-modal="true"
                    >
                      <div className="fixed inset-0 bg-gray-500 bg-opacity-25 backdrop-blur-sm transition-opacity"></div>

                      <div className="fixed inset-0 z-10 overflow-y-auto">
                        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                          <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                            <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                              <div className="sm:flex sm:items-start">
                                <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-blue-100 sm:mx-0 sm:h-10 sm:w-10">
                                  <svg
                                    className="h-8 w-8 text-blue-600"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 960 960"
                                    strokeWidth="1.5"
                                    stroke="currentColor"
                                    aria-hidden="true"
                                  >
                                    <path
                                      d="M475.448 702.412C406.938 702.412 338.418 703.092 269.923 702.076C205.224 702.528 118.821 694.142 117.31 611.319C112.909 527.954 96.3122 443.624 111.185 360.523C121.543 295.895 184.177 278.786 241.534 281.049C346.158 280.958 450.662 277.947 555.135 272.347C638.446 276.542 803.163 233.744 838.578 334.493C851.77 378.589 849.595 425.196 853.469 470.642C854.912 551.558 854.938 677.444 754.205 695.674C661.995 711.931 568.458 701.093 475.444 704.164C475.447 703.58 475.447 702.996 475.448 702.412ZM424.622 653.074C424.621 653.061 424.621 653.047 424.62 653.034C519.763 653.034 614.906 653.103 710.049 652.999C776.124 655.617 807.69 585.914 804.711 528.595C808.575 461.92 801.304 395.328 782.441 331.14C768.717 312.967 717.164 311.381 695.094 311.293C537.13 317.207 379.137 323.333 221.076 326.218C201.511 328.984 175.282 328.691 165.347 349.288C154.86 369.239 153.29 391.06 153.743 412.561C154.682 457.068 157.185 501.557 159.824 546.007C161.193 569.077 163.997 592.074 166.576 615.056C168.537 632.529 179.098 643.339 195.797 646.741C271.107 659.787 348.492 650.533 424.622 653.074Z"
                                      fill="#0000ff"
                                    />
                                    <path
                                      d="M477.551 131.476C477.551 109.336 477.321 87.1927 477.629 65.0577C478.279 31.4447 525.841 32.6197 525.416 66.9797C525.588 109.755 525.624 152.555 524.038 195.309C524.342 228.391 478.256 230.876 477.717 197.893C477.463 175.757 477.651 153.615 477.651 131.476C477.617 131.476 477.584 131.476 477.551 131.476Z"
                                      fill="#0000ff"
                                    />
                                    <path
                                      d="M506.142 840.64C505.863 859.791 506.756 879.035 505.714 898.146C502.457 927.761 460.741 926.06 459.773 896.353C458.062 860.542 457.865 824.677 457.012 788.839C456.646 772.785 464.647 761.025 477.398 759.15C519.249 756.101 503.067 814.414 505.94 840.64C506.007 840.64 506.075 840.64 506.142 840.64Z"
                                      fill="#0000ff"
                                    />
                                    <path
                                      d="M363.714 255.667C351.164 252.159 341.517 244.565 332.533 235.415C318.342 222.562 304.325 209.515 290.014 196.798C261.892 176.103 291.903 134.481 320.23 158.968C341.25 179.104 364.659 197.877 382.331 221.08C391.369 236.024 381.279 254.241 363.714 255.667Z"
                                      fill="#0000ff"
                                    />
                                    <path
                                      d="M586.134 731.82C612.423 741.785 631.461 764.062 653.596 780.724C677.253 799.103 651.146 832.567 627.418 814.943C608.954 801.911 590.834 788.362 572.97 774.513C554.591 760.479 563.727 733.745 586.134 731.82Z"
                                      fill="#0000ff"
                                    />
                                    <path
                                      d="M604.674 246.415C581.352 244.941 575.988 216.978 593.687 204.619C609.585 191.484 625.805 178.734 641.996 165.955C649.021 160.41 656.941 157.972 665.729 161.025C682.581 166.88 685.922 187.821 671.5 200.173C649.968 216.364 630.145 236.656 604.674 246.415Z"
                                      fill="#0000ff"
                                    />
                                    <path
                                      d="M351.843 738.77C411.404 753.772 344.094 807.091 315.128 815.999C305.271 820.098 294.752 814.353 289.6 805.468C284.525 796.714 284.947 784.815 293.07 777.95C308.038 765.301 323.986 753.782 339.88 742.282C343.054 739.986 347.815 739.884 351.843 738.77Z"
                                      fill="#0000ff"
                                    />
                                    <path
                                      d="M424.623 653.077C348.489 650.54 271.113 659.786 195.797 646.749C179.099 643.343 168.538 632.533 166.577 615.06C163.998 592.078 161.195 569.081 159.825 546.011C157.186 501.561 154.683 457.072 153.744 412.565C153.29 391.063 154.86 369.242 165.348 349.293C175.217 328.67 201.578 329.015 221.076 326.222C379.138 323.337 537.132 317.21 695.094 311.297C717.752 311.397 768.342 312.951 782.446 331.141C801.292 395.335 808.587 461.921 804.711 528.6C807.657 585.896 776.163 655.649 710.048 653C614.907 653.105 519.764 653.037 424.622 653.037C424.622 653.051 424.622 653.064 424.623 653.077ZM368.82 469.328C439.009 377.24 246.578 302.471 241.47 416.55C244.678 463.207 244.995 509.977 245.965 556.716C249.255 593.656 293.969 585.89 320.42 587.38C378.188 587.352 414.98 517.669 368.82 469.328ZM395.989 472.889C396.939 488.33 397.129 500.549 398.547 512.624C399.841 571.073 474.145 626.171 519.168 572.358C559.797 523.729 550.58 456.286 548.107 397.482C547.844 367.977 507.368 367.875 508.864 398.04C510.387 446.775 522.001 503.822 491.077 545.863C481.027 556.913 471.495 557.814 459.549 548.856C423.144 522.765 441.346 431.359 439.96 389.689C442.001 365.239 410.587 359.752 405.285 384.257C398.04 412.719 398.924 446.295 395.989 472.889ZM635.924 445.95C619.304 419.91 605.823 397.084 589.652 372.233C572.704 347.414 543.327 370.115 558.444 394.233C574.813 420.677 590.549 447.552 607.988 473.272C613.386 481.233 615.111 488.329 614.745 497.263C613.653 523.868 612.813 550.489 612.337 577.113C612.138 588.257 619.96 596.29 629.883 596.53C640.143 596.778 647.729 589.619 648.209 578.107C649.392 549.76 650.385 521.401 650.926 493.036C651.057 486.19 651.896 480.881 657.883 476.405C680.354 452.527 693.688 420.701 712.138 393.599C723.858 375.599 701.459 354.103 685.052 369.495C666.777 394.404 654.855 420.572 635.924 445.95Z"
                                      fill="ffffff00"
                                    />
                                    <path
                                      d="M368.82 469.325C414.982 517.664 378.186 587.351 320.42 587.378C293.995 585.918 249.225 593.644 245.965 556.713C244.995 509.975 244.678 463.204 241.473 416.547C246.569 302.49 439.017 377.212 368.82 469.325ZM279.024 494.857C282.425 549.219 262.479 545.358 322.199 546.758C351.242 547.668 362.807 500.496 331.33 495.226C314.736 493.607 297.86 494.857 279.024 494.857ZM280.399 455.035C296.481 453.096 311.678 451.561 326.756 449.243C373.611 433.678 318.565 386.534 289.565 401.13C285.939 402.511 281.014 406.654 280.812 409.79C279.877 424.283 280.399 438.869 280.399 455.035Z"
                                      fill="#0000ff"
                                    />
                                    <path
                                      d="M395.988 472.887C398.921 446.293 398.04 412.717 405.282 384.254C410.612 359.793 441.976 365.196 439.961 389.688C441.316 431.199 423.198 522.953 459.545 548.855C471.494 557.812 481.026 556.911 491.073 545.861C522.003 503.807 510.379 446.789 508.865 398.039C507.331 367.934 547.871 367.928 548.106 397.482C550.585 456.266 559.795 523.748 519.165 572.36C474.139 626.137 399.841 571.098 398.55 512.62C397.128 500.547 396.938 488.327 395.988 472.887Z"
                                      fill="#0000ff"
                                    />
                                    <path
                                      d="M635.922 445.95C654.849 420.58 666.782 394.393 685.047 369.493C701.387 354.159 723.908 375.532 712.13 393.598C693.687 420.7 680.348 452.529 657.882 476.407C651.892 480.881 651.053 486.19 650.923 493.036C650.382 521.401 649.389 549.76 648.206 578.107C647.726 589.618 640.14 596.778 629.88 596.53C619.958 596.29 612.135 588.258 612.334 577.113C612.81 550.49 613.651 523.869 614.742 497.263C615.109 488.329 613.383 481.232 607.985 473.272C590.546 447.551 574.81 420.676 558.44 394.232C543.368 370.17 572.644 347.362 589.65 372.234C605.824 397.089 619.299 419.907 635.922 445.95Z"
                                      fill="#0000ff"
                                    />
                                    <path
                                      d="M279.023 494.859C297.859 494.859 314.735 493.609 331.331 495.229C362.794 500.503 351.254 547.669 322.198 546.76C262.457 545.379 282.43 549.156 279.023 494.859Z"
                                      fill="ffffff00"
                                    />
                                    <path
                                      d="M280.399 455.035C280.399 438.87 279.877 424.283 280.812 409.79C281.014 406.655 285.939 402.511 289.565 401.128C318.575 386.54 373.609 433.677 326.756 449.245C311.678 451.561 296.48 453.095 280.399 455.035Z"
                                      fill="ffffff00"
                                    />
                                  </svg>
                                </div>
                                <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                                  <h3
                                    className="text-lg font-medium leading-6 text-gray-900"
                                    id="modal-title"
                                  >
                                    Are you sure to Buy this NFT?
                                  </h3>
                                  <div className="mt-2">
                                    <p className="text-sm text-gray-500">
                                      Are you sure you want to buy this NFT?
                                      your will be permanently owned. This
                                      action cannot be undone. but you can List
                                      them back from your available list to
                                      resale it.
                                    </p>
                                  </div>
                                </div>
                              </div>
                            </div>

                            <div className="mx-20 flex gap-5">
                              <div>
                                <p>
                                  Token id:{" "}
                                  <b> {parseInt(selectedNFT.data.id)}</b>
                                </p>
                              </div>

                              <div>
                                <p>
                                  Current Price:{" "}
                                  <b>{parseInt(selectedNFT.data.price)}</b>
                                </p>
                              </div>
                            </div>

                            <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                              <button
                                onClick={buyNow}
                                type="button"
                                className="inline-flex w-full justify-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm"
                              >
                                Buy Now
                              </button>
                              <button
                                onClick={() => togglePop(item)}
                                type="button"
                                className="mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                              >
                                Cancel
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : null}
                </div>
              </div>
            ))}
      </div>
    </>
  );
}

export default Balances;
