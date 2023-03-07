import { Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import MetadataUpdate from "./components/MedataUpdate";
import FileUpload from "./components/UploadFile";
import User from "./components/User/User";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/MintNFT" element={<FileUpload />} />
      <Route path="/MetadataUpdate" element={<MetadataUpdate />} />
      <Route path="/User" element={<User />} />
    </Routes>
  );
}

export default App;
