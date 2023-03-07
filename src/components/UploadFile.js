import { useState } from "react";
import axios from "axios";
import { ethers } from "ethers";
import { Oval } from "react-loader-spinner";

import MyToken from "../SmartContractAbi/MyToken.json";
import Header from "./Header";

const JWT = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiI3MGRlNzliMC02ZDQzLTRiMWEtYWNiMS1mN2E3MzYzZDhiZmUiLCJlbWFpbCI6InNodWphYWJyYXI3QGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJwaW5fcG9saWN5Ijp7InJlZ2lvbnMiOlt7ImlkIjoiRlJBMSIsImRlc2lyZWRSZXBsaWNhdGlvbkNvdW50IjoxfSx7ImlkIjoiTllDMSIsImRlc2lyZWRSZXBsaWNhdGlvbkNvdW50IjoxfV0sInZlcnNpb24iOjF9LCJtZmFfZW5hYmxlZCI6ZmFsc2UsInN0YXR1cyI6IkFDVElWRSJ9LCJhdXRoZW50aWNhdGlvblR5cGUiOiJzY29wZWRLZXkiLCJzY29wZWRLZXlLZXkiOiI1ZDg0ODYxZmU0NGMwOWRhYWFiNSIsInNjb3BlZEtleVNlY3JldCI6ImNhZjZhZWQxMzRlNTg1ODFlZTliZmYwOGQ5YmVjMWVjOTU2NDEyNWQxMzE4MDJhZDNhOWJiYTY2M2Q3NWFiOGEiLCJpYXQiOjE2NzQ5MTc4Mzl9.ThS5rN4fXA37xjX4vs5kzYrIlI2dtE6mj28ydeHHAuA`;

const FileUpload = () => {
  const [selectedFile, setSelectedFile] = useState();
  const [fileName, setFileName] = useState();
  const [description, setDescription] = useState();
  const [uriJson, setUriJson] = useState();
  const [NFTAddress, setNFTAddress] = useState("");
  const [toAddress, setToAddress] = useState("");

  const [isSubmitingForm, setIsSubmittingForm] = useState(false);

  const changeHandler = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const setNameHandeler = (event) => {
    setFileName(event.target.value);
  };

  const setNFTAddressHandeler = (event) => {
    setNFTAddress(event.target.value);
  };

  const setToAddressHandeler = (event) => {
    setToAddress(event.target.value);
  };

  const setDescriptionHandeler = (event) => {
    setDescription(event.target.value);
  };

  const handleJSONsubmission = async (_hash) => {
    try {
      await axios({
        method: "post",
        url: "https://api.pinata.cloud/pinning/pinJSONToIPFS",
        data: {
          name: fileName,
          description: description,
          image: "https://ipfs.io/ipfs/" + _hash.data.IpfsHash,
        },
        headers: {
          pinata_api_key: `5d84861fe44c09daaab5`,
          pinata_secret_api_key: `caf6aed134e58581ee9bff08d9bec1ec9564125d131802ad3a9bba663d75ab8a`,
          "Content-Type": "application/json",
        },
      }).then((res) => {
        console.log(res);
        setUriJson(JSON.stringify(res.data.IpfsHash));
      }).then(async () => {
        await MintNFT();
        setIsSubmittingForm(false);
      });
    } catch (error) {
      setIsSubmittingForm(false);
      console.log(error);
    }
  };

  const MintNFT = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    await provider.send("eth_requestAccounts", []);

    const signer = provider.getSigner();

    const erc721 = new ethers.Contract(NFTAddress, MyToken, provider);
    const erc721_rw = new ethers.Contract(NFTAddress, MyToken, signer);

    try {
      await erc721_rw.safeMint(
        toAddress,
        "https://gateway.pinata.cloud/ipfs/" + uriJson.replaceAll('"','')
      ).then(async ()=>{
        await erc721_rw.tokenURI(await erc721.totalSupply()-1).then((res) =>{
          console.log(res);
        }).then(()=>{
          setNameHandeler();
          setNFTAddressHandeler();
          setToAddressHandeler();
          setDescriptionHandeler();
          changeHandler();
        })
      });
    } catch (error) {
      console.log(error);
    }
  };
  const handleImageSubmission = async () => {
    setIsSubmittingForm(true);
    const formData = new FormData();

    formData.append("file", selectedFile);

    const metadata = JSON.stringify({
      name: fileName,
    });

    formData.append("pinataMetadata", metadata);

    const options = JSON.stringify({
      cidVersion: 0,
    });
    formData.append("pinataOptions", options);

    try {
      await axios
        .post("https://api.pinata.cloud/pinning/pinFileToIPFS", formData, {
          maxBodyLength: "Infinity",
          headers: {
            "Content-Type": `multipart/form-data; boundary=${formData._boundary}`,
            Authorization: "Bearer " + JWT,
          },
        })
        .then(async (res) => {
          await handleJSONsubmission(res).then(() => {
            console.log(res);
          });
        });
    } catch (error) {
      setIsSubmittingForm(false);
      console.log(error);
    }
  };

  return (
    <>
      <Header />
      <div className="w-auto flex justify-center m-8">
        <div>
          <input
            type="file"
            onChange={changeHandler}
            className="block mx-auto text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
          />
          <form className=" flex items-center ">
            <label className="block">
              <div className="form-floating mb-3 m-5 w-[500px]">
                <input
                  onChange={setNFTAddressHandeler}
                  value={NFTAddress}
                  type="Text"
                  className="form-control block w-full my-3 px-3 py-1.5 text-s font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                  placeholder="Enter NFT Contract Address"
                />

                <input
                  onChange={setToAddressHandeler}
                  value={toAddress}
                  type="Text"
                  className="form-control block w-full my-3 px-3 py-1.5 text-s font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                  placeholder="Enter Address you are Minting For"
                />

                <input
                  onChange={setNameHandeler}
                  value={fileName}
                  type="Text"
                  className="form-control block w-full my-3 px-3 py-1.5 text-s font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                  placeholder="Name of your NFT"
                />

                <textarea
                  type="textarea"
                  rows="5"
                  value={description}
                  onChange={setDescriptionHandeler}
                  className=" form-control block w-full my-3 px-3 py-1.5 text-s font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                  placeholder="Provide a detailed description of your NFT"
                />
              </div>
            </label>
          </form>

          <button
            onClick={handleImageSubmission}
            className="bg-blue-500 text-white p-3 block px-5 mx-auto rounded-xl h-[4rem]"
          >
            {isSubmitingForm ? (
              <Oval
              height={30}
              width={80}
              color="#fff"
              wrapperStyle={{}}
              wrapperClass=""
              visible={true}
              ariaLabel='oval-loading'
              secondaryColor="#bbb"
              strokeWidth={10}
              strokeWidthSecondary={10}
            
            />
            ) : (
              "Mint NFT"
            )}
          </button>
          {uriJson}
        </div>
      </div>
    </>
  );
};

export default FileUpload;
