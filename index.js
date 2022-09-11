import {abi, contractAddress} from "./constants.js";
import { ethers } from "./ethers-5.6.esm.min.js";


const connectButton = document.getElementById("connectButton");
const addKlinikButton = document.getElementById("addKlinikButton");
const subscribeAsPatientButton = document.getElementById("subscribeAsPatientButton");
// inputs 
let patientNameInput = document.getElementById("patientName");
let patientAgeInput = document.getElementById("patientAge");
let patientAddressInput = document.getElementById("patientAddress");

let payBillButton = document.getElementById("payBill");
let payBillAddr = document.getElementById("payBillAddr");

let finalRecordDisplay;
const finalRecordButton = document.getElementById("finalRecord");
finalRecordButton.onclick = getFinalRecord;

function getFinalRecordAddr(){
    return document.getElementById("finalRecordAddreeesse").value;
}



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
connectButton.onclick = connect;
addKlinikButton.onclick = addKlinik;
subscribeAsPatientButton.onclick = subscribeAsPatient;


async function connect() {
    if (typeof window.ethereum !== "undefined") {
      try {
        await ethereum.request({ method: "eth_requestAccounts" })
      } catch (error) {
        console.log(error)
      }
      connectButton.innerHTML = "Connected"
      const accounts = await ethereum.request({ method: "eth_accounts" })
      console.log(accounts)
    } else {
      connectButton.innerHTML = "Please install MetaMask"
    }
}

function getKlinikAddr () {return document.getElementById("klinikAddr").value}
function getKlinikName(){return document.getElementById("klinikName").value}
const klinikAddressInput = document.getElementById("klinikAddr")
const klinikNameInput = document.getElementById("klinikName")

klinikAddressInput.onchange = getKlinikAddr()
klinikNameInput.onchange = getKlinikName()

let klinikAddress = getKlinikAddr();
let klinikName = getKlinikName();
//"0x70997970C51812dc3A010C7d01b50e0d17dc79C8"


async function addKlinik(){

    console.log("adding a Klinik ...")
    
    if (typeof window.ethereum !== "undefined") {

        const provider = new ethers.providers.Web3Provider(window.ethereum)
        await provider.send('eth_requestAccounts', [])
        const signer = provider.getSigner()
        const contract = new ethers.Contract(contractAddress, abi, signer)
        console.log('owner = ', await contract.getOwner())
    
    try {
        await contract.addKlinik(getKlinikAddr(), getKlinikName())
     
        console.log("clinik was added successfully")
        console.log(getKlinikAddr()," is at ", getKlinikName())
    } catch (error) {
        console.log(error)
      }
    } else {
        connectButton.innerHTML = "Please install MetaMask"
    }
}

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

const withDrawButton = document.getElementById("withDraw");
withDrawButton.onclick = withDraw;

function getKlinikAddresse(){

    return document.getElementById("KlinikWithDraw");

}
async function withDraw(/*address payable _addr*/){

    const provider = new ethers.providers.Web3Provider(window.ethereum)
    await provider.send('eth_requestAccounts', [])
    const signer = provider.getSigner()
    const contract = new ethers.Contract(contractAddress, abi, signer)
    try{
        await contract.fund( getKlinikAddresse()); 
        console.log("transaction with success .. ")
    }catch(e){
        console.log("transaction failed ..",e)
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