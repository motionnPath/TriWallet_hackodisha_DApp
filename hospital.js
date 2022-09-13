import {abi, contractAddress} from "./constants.js";
import { ethers } from "./ethers-5.6.esm.min.js";


let finalRecordDisplay;
const finalRecordButton = document.getElementById("finalRecord");
finalRecordButton.onclick = getFinalRecord;

function getFinalRecordAddr(){
    return document.getElementById("finalRecordAddreeesse").value;
}

const createPatientRecordButton = document.getElementById("createPatientRecord");
const patientWalletAddrInput = document.getElementById("patientWalletAddr");
const patientTraitementInput = document.getElementById("patientTraitement");
const patientPerscriptionInput = document.getElementById("patientPerscription");
const patientDeptInput = document.getElementById("patientDept");
const klinikWalletWallet = document.getElementById("klinikWallet");

createPatientRecordButton.onclick = addPatientRecord;
patientWalletAddrInput.onchange = getRecordAddr;
klinikWalletWallet.onchange = getKlinikWallet;
patientTraitementInput.onchange = getTraitements;
patientPerscriptionInput.onchange = getPerscriptions;
patientDeptInput.onchange = getCost;

function getKlinikWallet(){
    return document.getElementById("klinikWallet").value;
}

function getRecordAddr(){
    return document.getElementById("patientWalletAddr").value;
}
function getTraitements(){
    return document.getElementById("patientTraitement").value;
}
function getPerscriptions(){
    return document.getElementById("patientPerscription").value;
}
function getCost(){
    return document.getElementById("patientDept").value;
}

async function addPatientRecord(/*address _addr,address _klinikaddr, string memory _traitement, string memory _prescription, uint256 _costs*/){

    console.log(getRecordAddr(),getKlinikWallet(), getTraitements(), getPerscriptions(), getCost())
    if(typeof window.ethereum !== "undefined"){
        const provider = new ethers.providers.Web3Provider(window.ethereum)
        await provider.send('eth_requestAccounts', [])
        const signer = provider.getSigner()
        const contract = new ethers.Contract(contractAddress, abi, signer)
    
        try{
            await contract.addPatientRecord(getRecordAddr(),getKlinikWallet(), getTraitements(), getPerscriptions(), getCost())
            console.log('recording new infos for patient..')
        }catch(e){
            console.log(e)
            
        }
    }

}

async function getFinalRecord(/*_addr */) {

    const provider = new ethers.providers.Web3Provider(window.ethereum)
    await provider.send('eth_requestAccounts', [])
    const signer = provider.getSigner()
    const contract = new ethers.Contract(contractAddress, abi, signer)
    try{
        finalRecordDisplay = await contract.getFinalRecord(getFinalRecordAddr()); 
        console.log("displaying patient full record.. ",(await finalRecordDisplay)[0])

        let identity = (await finalRecordDisplay)[0]

        let _namee = await identity[0]
        let _agii = await identity[1]
        let _location = await identity[2]

        document.getElementById("name").innerText =_namee
        document.getElementById("age").innerText = _agii
        document.getElementById("location").innerText = _location

        let arr1 = (await finalRecordDisplay)[1];
        let len_1 =  (await finalRecordDisplay)[1].length;
        let data = []


        
        for(let i= 0; i<len_1; i++){
            data.push(arr1[i][0])
           
        }
        //console.log("data = ", data)
        let trait = []
        let cost = []
        let per = []
        for(let j= 0; j<data.length; j++){
            trait.push(data[j][0])
            per.push(data[j][1])
            cost.push(data[j][2].toString())
           
        }
        console.log("trait = ",trait)
        console.log("per = ",per)
        console.log("cost = ",cost)

        
    }catch(e){
        console.log("transaction failed ..",e)
    }

}
