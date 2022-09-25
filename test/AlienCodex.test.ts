import { expect } from 'chai';
import { ethers } from 'hardhat';

describe('[Alien Codex Challenge]', function alienCodexTest(){

    let deployer: any, attacker: any;
    const contractDeployerAddress = "0xda5b3Fb76C78b6EdEE6BE8F11a1c31EcfB02b272"

    before(async function beforeTestOperation(){

        [deployer, attacker] = await ethers.getSigners();

        let AlienCodexFactory = await ethers.getContractFactory("AlienCodex");

        this.alienContract = AlienCodexFactory.attach("0x900F85A3B5C2A0b5b8917c740cF39E6AA4D3B636");
    })

    xit("should have the correct owner set", async function ownerChecker(){
        let ownerAddress = await this.alienContract.owner();
        expect(ownerAddress).to.equal(contractDeployerAddress);
    })

    it("should take ownership of the contract", async function exploit(){

        let ExploitFactory = await ethers.getContractFactory("AlienExploit", attacker);

        this.exploit = await ExploitFactory.deploy(this.alienContract.address);

        expect(await this.exploit.owner())
        .to.equal(
            attacker.address
        );

        await this.exploit.attack();
    })

    after(async function checkWinningConditions() {
        let newOwner = await this.alienContract.owner();
        expect(newOwner).to.equal(attacker.address);
    })
})