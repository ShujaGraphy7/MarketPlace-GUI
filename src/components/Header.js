import { Link } from "react-router-dom";
import Logo from "../media/SG sign updates.png";
import { useAccount, useConnect, useEnsName } from "wagmi";
import { InjectedConnector } from "wagmi/connectors/injected";
import { useState } from "react";

function Header() {
  const { address, isConnected } = useAccount();
  const { data: ensName } = useEnsName({ address });
  const [navbar, setNavbar] = useState(false);

  const { connect } = useConnect({
    connector: new InjectedConnector(),
  });
  return (
    // <nav className="bg-white border-gray-200 px-2 sm:px-4 py-2.5 rounded dark:bg-gray-900 border-b-2">
    //   <div className="container flex flex-wrap items-center justify-between mx-auto">
    //     <Link to="/" className="flex items-center">
    //       <img src={Logo} alt="" className="h-6 mr-3 sm:h-14" />
    //     </Link>

    //     <ul
    //       className="
    //         flex flex-col p-4 mt-4 border border-gray-100 rounded-lg bg-gray-50 
    //         md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium md:border-0 md:bg-white
    //         md:dark:bg-gray-900 
    //         dark:border-gray-700
    //         dark:bg-gray-800"
    //     >
    //       <li>
    //         <Link
    //           to="/"
    //           className="block py-2 pl-3 pr-4 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 dark:text-white"
    //           aria-current="page"
    //         >
    //           Home
    //         </Link>
    //       </li>
    //       <li>
    //         <Link
    //           to="/MintNFT"
    //           className="block py-2 pl-3 pr-4 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 dark:text-white"
    //           aria-current="page"
    //         >
    //           Mint NFT
    //         </Link>
    //       </li>

    //       <li>
    //         <Link
    //           to="/MetadataUpdate"
    //           className="block py-2 pl-3 pr-4 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
    //         >
    //           Metadata Update
    //         </Link>
    //       </li>

    //       <li>
    //         <Link
    //           to="/User"
    //           className="block py-2 pl-3 pr-4 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
    //         >
    //           Profile
    //         </Link>
    //       </li>
    //     </ul>

    //     <button
    //       onClick={() => connect()}
    //       className="border-[1px] p-2 rounded-2xl bg-white mx-5"
    //     >
    //       {isConnected
    //         ? ensName ?? address.slice(0, 5) + "..." + address.slice(-5)
    //         : "Connect Me"}
    //     </button>
    //   </div>
    // </nav>


<nav className="w-full bg-white shadow">
  <div className="justify-between px-4 mx-auto lg:max-w-7xl md:items-center md:flex md:px-8">
    <div>
      <div className="flex items-center justify-between py-3 md:py-5 md:block">
      <Link to="/" className="flex items-center">
          <img src={Logo} alt="" className="h-6 mr-3 sm:h-14" />
        </Link>
        <div className="md:hidden">
          <button
            className="p-2 text-gray-700 rounded-md outline-none focus:border-gray-400 focus:border"
            onClick={() => setNavbar(!navbar)}
          >
            {navbar ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            )}
          </button>
        </div>
      </div>
    </div>
    <div>
      <div
        className={`flex-1 justify-self-center pb-3 mt-8 md:block md:pb-0 md:mt-0 ${
          navbar ? "block" : "hidden"
        }`}
      >
        <ul className="items-center justify-center space-y-8 md:flex md:space-x-6 md:space-y-0">
          <li>
            <Link
              to="/"
              className="block py-2 pl-3 pr-4 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 dark:text-white"
              aria-current="page"
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              to="/MintNFT"
              className="block py-2 pl-3 pr-4 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 dark:text-white"
              aria-current="page"
            >
              Mint NFT
            </Link>
          </li>

          <li>
            <Link
              to="/MetadataUpdate"
              className="block py-2 pl-3 pr-4 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
            >
              Metadata Update
            </Link>
          </li>

          <li>
            <Link
              to="/User"
              className="block py-2 pl-3 pr-4 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
            >
              Profile
            </Link>
          </li>
        <button
          onClick={() => connect()}
          className="border-[1px] p-2 rounded-2xl bg-white mx-5"
        >
          {isConnected
            ? ensName ?? address.slice(0, 5) + "..." + address.slice(-5)
            : "Connect Me"}
        </button>
        </ul>
      </div>
    </div>
  </div>
</nav>
  );
}

export default Header;

