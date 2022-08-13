import { expect } from 'chai';
import { ethers } from 'hardhat';

describe("NaughtCoinExploit", function (){
    const { BigNumber } = ethers;
    let owner: any;
    let victim: any;
    let exploit: any;
    before(async () => {
        let VictimContract = await ethers.getContractFactory("NaughtCoin");
        let ExploiterContract = await ethers.getContractFactory("NaughtCoinExploit");

        [owner] = await ethers.getSigners();

        victim = await VictimContract.deploy(owner.address);
        exploit = await ExploiterContract.deploy(victim.address);
    });

    it("should have the victim address set correctly", async () => {
        const victimAddress: string = await exploit.functions.victim();
        expect(victimAddress[0]).to.equal(victim.address);
    });

    it("should be able to exploit the victim", async () => {
        let allowance: any = ethers.BigNumber.from("1000000000000000000000000");
        await victim.functions.approve(exploit.address, allowance);

        let ownerBalance = parseInt(await victim.functions.balanceOf(owner.address));
        expect(ownerBalance).to.equal(10**24);

        await exploit.functions.exploitVictim(allowance);
        ownerBalance = parseInt(await victim.functions.balanceOf(owner.address));
        console.log(ownerBalance);
        expect(ownerBalance).to.equal(0);
    })
})