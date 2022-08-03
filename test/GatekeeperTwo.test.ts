import { expect } from 'chai';
import { ethers } from 'hardhat';


describe("GateKeeperTwoExploit", function () {
    // const contractAddress = "0xFc5ba1E455e6DEa67ea701c347d825C4DA410A7e";
    // const exploitAddress = "";
    // let owner = "0xD81d19cE53621c5Da0f997830C1b97FB872C2daa";
    let owner: any;
    let contract: any;
    let exploit: any;
    before(async () => {
        [owner] = await ethers.getSigners();

        const ContractFactory = await ethers.getContractFactory("GatekeeperTwo");
        const ExploitFactory = await ethers.getContractFactory("GatekeeperTwoExploit");

        // contract = await ContractFactory.attach(contractAddress);
        // exploit = await ExploitFactory.attach(exploitAddress);

        contract = await ContractFactory.deploy();
        exploit = await ExploitFactory.deploy(contract.address);
    })

    it("should have the victim address set correctly", async () => {
        const victimAddress = await exploit.functions.victim();
        expect(victimAddress[0]).to.equal(contract.address);
    })

    it("should have the owner address set correctly", async () => {
        const ownerAddress = await exploit.functions.owner();
        expect(ownerAddress[0]).to.equal(owner.address);
    })

    it("should be able to exploit the victim contract", async () => {

    })
})