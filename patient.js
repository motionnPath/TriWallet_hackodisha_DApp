import {abi, contractAddress} from "./constants.js";
import { ethers } from "./ethers-5.6.esm.min.js";


const subscribeAsPatientButton = document.getElementById("subscribeAsPatientButton");
let patientNameInput = document.getElementById("patientName");
let patientAgeInput = document.getElementById("patientAge");
let patientAddressInput = document.getElementById("patientAddress");


let payBillButton = document.getElementById("payBill");
let payBillAddr = document.getElementById("payBillAddr");


patientAddressInput.onchange = getAddress;
patientAgeInput.onchange = getAge;
patientNameInput.onchange = getName;
payBillAddr.onchange = getBillAdd;


let patientName, patientAge, PatientAddr;

function getAddress(){
    return document.getElementById("patientAddress").value;
}
function getAge(){
    return document.getElementById("patientAge").value;
}
function getName(){
    return document.getElementById("patientName").value;; 
}
function getBillAdd(){
    return document.getElementById("payBillAddr").value;
}

payBillButton.onchange = payBill;
subscribeAsPatientButton.onclick = subscribeAsPatient;


async function subscribeAsPatient(/*_name, _age, _addr */){

    if (typeof window.ethereum !== "undefined"){
        const provider = new ethers.providers.Web3Provider(window.ethereum)
        await provider.send('eth_requestAccounts', [])
        const signer = provider.getSigner()
        const contract = new ethers.Contract(contractAddress, abi, signer)
        console.log('adding a patient sub')
        try{
            await contract.subscribeAsPatient(getName(),getAge(),getAddress(),{value:22})
            console.log("patient subscribed successfully ...")
        }catch(e){
            console.log(e);
        }
    
        
    }else {
        connectButton.innerHTML = "Please install MetaMask";
    }
    
}

async function payBill(/* wallrt addr  */){


    const provider = new ethers.providers.Web3Provider(window.ethereum)
    await provider.send('eth_requestAccounts', [])
    const signer = provider.getSigner()
    const contract = new ethers.Contract(contractAddress, abi, signer)
    try{
        await contract.fund(getBillAdd(),{value:await contract.getPatientDept(getBillAdd())}); 
        console.log("transaction with success .. ")
    }catch(e){
        console.log("transaction failed ..",e)
    }
    
}