import { ethers } from "hardhat";

async function delayFor(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
}   

async function main() {
    const contractAddress = "0xFE0F7827bC4aB6BA263B824318f216A7beE59572";
    const TokeContact = await ethers.getContractFactory("MyERC20Token");
    const contract = await TokeContact.attach(contractAddress) as any;

    // contract.on("*", (event) => {
    //     console.log(event);
    // });

    contract.on("Transfer", (from, to, value) => {
        console.log('Transfer', from, to, value);
    });

    contract.on("Approval", (owner, spender, value) => {
        console.log('Approval', owner, spender, value);
    });

    // this won't work
    // while (true);

    while (true) {
        await delayFor(10);
    }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
});

