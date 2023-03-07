const { ethers } = require("hardhat");

async function main(){
    const [deployer] = await ethers.getSigners();

    const MyToken = await ethers.getContractFactory("MyToken");
    const mytoken = await MyToken.deploy();
    console.log("myToken1 Address: ", mytoken.address);

}

main()
.then(()=>process.exit(0))
.catch((error)=>{
    console.error(error);
    process.exit(1);
})