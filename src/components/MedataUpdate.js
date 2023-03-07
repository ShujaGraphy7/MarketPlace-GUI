import { useState } from "react";
import axios from "axios";

import Header from "./Header";

const JWT = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiI3MGRlNzliMC02ZDQzLTRiMWEtYWNiMS1mN2E3MzYzZDhiZmUiLCJlbWFpbCI6InNodWphYWJyYXI3QGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJwaW5fcG9saWN5Ijp7InJlZ2lvbnMiOlt7ImlkIjoiRlJBMSIsImRlc2lyZWRSZXBsaWNhdGlvbkNvdW50IjoxfSx7ImlkIjoiTllDMSIsImRlc2lyZWRSZXBsaWNhdGlvbkNvdW50IjoxfV0sInZlcnNpb24iOjF9LCJtZmFfZW5hYmxlZCI6ZmFsc2UsInN0YXR1cyI6IkFDVElWRSJ9LCJhdXRoZW50aWNhdGlvblR5cGUiOiJzY29wZWRLZXkiLCJzY29wZWRLZXlLZXkiOiI1ZDg0ODYxZmU0NGMwOWRhYWFiNSIsInNjb3BlZEtleVNlY3JldCI6ImNhZjZhZWQxMzRlNTg1ODFlZTliZmYwOGQ5YmVjMWVjOTU2NDEyNWQxMzE4MDJhZDNhOWJiYTY2M2Q3NWFiOGEiLCJpYXQiOjE2NzQ5MTc4Mzl9.ThS5rN4fXA37xjX4vs5kzYrIlI2dtE6mj28ydeHHAuA";

const FileUpload = () => {
  const [selectedFile, setSelectedFile] = useState();
  // const [uriImage, setUriImage] = useState("");
  const [CID, setCID] = useState("");

  const changeHandler = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const setCIDHandeler = (event) => {
    setCID(event.target.value);
  };

  const handleJSONsubmission = async (_hash) => {
    try {
      await axios({
        method: "put",
        url: "https://api.pinata.cloud/pinning/hashMetadata",
        data: {
          ipfsPinHash: CID,
            
           image: "https://ipfs.io/ipfs/" + _hash?.data?.IpfsHash.toString(),
           
        },
        headers: {
          Authorization: JWT,
          "Content-Type": "application/json",
        },
      }).then(async (res) => {
        console.log(res);
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleImageSubmission = async () => {
    const formData = new FormData();

    formData.append("file", selectedFile);

    const metadata = JSON.stringify({
      name: "File name",
    });
    formData.append("pinataMetadata", metadata);

    const options = JSON.stringify({
      cidVersion: 0,
    });
    formData.append("pinataOptions", options);

    try {
      await axios
        .post(
          // const res = await axios.post(
          "https://api.pinata.cloud/pinning/pinFileToIPFS",
          formData,
          {
            maxBodyLength: "Infinity",
            headers: {
              "Content-Type": `multipart/form-data; boundary=${formData._boundary}`,
              Authorization: JWT,
            },
          }
        )
        .then((res) => {
          handleJSONsubmission(res);
        });
    } catch (error) {
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
                  onChange={setCIDHandeler}
                  type="Text"
                  className="form-control block w-full my-3 px-3 py-1.5 text-s font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                  placeholder="Enter CID"
                />

               
              </div>
            </label>
          </form>

          <button
            onClick={handleImageSubmission}
            className="bg-blue-500 text-white p-3 block px-5 mx-auto rounded-xl h-[4rem]"
          >
            update Metadatas
          </button>
        </div>
      </div>
    </>
  );
};

export default FileUpload;
