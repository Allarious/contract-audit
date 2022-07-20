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

        return {gateKeeper, gatekeeperExploiter}
    }

    it("Should have the address of the owner set to the creator", async () => {
        const {gateKeeper, gatekeeperExploiter} = await loadFixture(deployGateKeeper);
        const [owner] = await hre.ethers.getSigners();
        expect(await gatekeeperExploiter.ownerAddress()).to.equal(owner.address)
    })

})