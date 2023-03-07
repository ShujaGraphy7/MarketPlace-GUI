import CollectionItem from "./CollectionItem";
import images from "../../media/images.jpeg";
import { useState } from "react";

function Collection() {
  const [nftName, setNftName] = useState("NFT Name");
  const [price, setPrice] = useState("1243");
  const [image, setImage] = useState(images);
  

  return (
    <>
      <div className={`grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4`}>
        <div>
          <CollectionItem image={image} name={nftName} price={price} />
        </div>
        <div>
          <CollectionItem image={image} name={nftName} price={price} />
        </div>
        <div>
          <CollectionItem image={image} name={nftName} price={price} />
        </div>
        <div>
          <CollectionItem image={image} name={nftName} price={price} />
        </div>
      </div>
    </>
  );
}

export default Collection;
