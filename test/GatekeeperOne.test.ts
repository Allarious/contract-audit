import {expect} from 'chai';
import hre from 'hardhat';
import { loadFixture } from "@nomicfoundation/hardhat-network-helpers";

describe("Exploit GateKeeperOne", function() {
    async function deployGateKeeper(){

        const Gatekeeper = await hre.ethers.getContractFactory("GatekeeperOne");
        const GatekeeperExploiter = await hre.ethers.getContractFactory("GatekeeperOneExploit")

        const gateKeeper = await Gatekeeper.deploy();
        const gatekeeperAddress = await gateKeeper.address
        const gatekeeperExploiter = await GatekeeperExploiter.deploy(gatekeeperAddress);

        const instance1 = await gateKeeper.deployed();
        const instance2 = await gatekeeperExploiter.deployed();

        return {gateKeeper: instance1, gatekeeperExploiter: instance2}
    }

    it("Should have the address of the owner set to the creator", async () => {
        const {gateKeeper, gatekeeperExploiter} = await loadFixture(deployGateKeeper);
        const [owner] = await hre.ethers.getSigners();
        expect(await gatekeeperExploiter.ownerAddress()).to.equal(owner.address)
    })
    
    xit("Should be able to exploit the gateKeeperOne contract", async () => {
        const {gateKeeper, gatekeeperExploiter} = await loadFixture(deployGateKeeper);

        const isEntered = await gatekeeperExploiter.functions.exploit("0x0000000000000000", {gasLimit: 3000000});
        // expect(isEntered).to.equal(true);
    })
})