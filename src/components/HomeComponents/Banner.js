import "../../media/MyCss.css";

import Balances from "../Balances";
function Banner() {
  return (
    <>
      <div>
        <div className="bg-gradient1 py-5 px-0">
          <div className="p-5 bg-[#ffffff7e] rounded-3xl mx-5">
            <div>
              <div className="p-5 border-2  rounded-3xl">
                <Balances/>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Banner;
