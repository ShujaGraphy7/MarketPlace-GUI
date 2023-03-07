function CollectionItem(props) {
  return (
    <>
      <div className="shadow-xl m-8  bg-white rounded-3xl w-96">
        <div className={`rounded-3xl rounded-b-none h-56`}>
          <img
            className="object-cover w-full h-56 rounded-3xl rounded-b-none"
            src={props.image}
            alt=""
          />
        </div>
        <div className="py-4 pb-6 px-6">
          <div className="mb-4 mt-2">
            <span className="font-bold text-xl">Name: {props.name}</span>
          </div>
          <div className="flex justify-between px-2">
            <div>
              <div>
                <span>NFT Price </span>
              
                <span className="font-bold">{props.price}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default CollectionItem;
