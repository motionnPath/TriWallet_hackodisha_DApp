import {abi, contractAddress} from "./constants.js";
import { ethers } from "./ethers-5.6.esm.min.js";



const addKlinikButton = document.getElementById("addKlinikButton");
const klinikAddressInput = document.getElementById("klinikAddr")
const klinikNameInput = document.getElementById("klinikName")






function getKlinikAddr () {return document.getElementById("klinikAddr").value}
function getKlinikName(){return document.getElementById("klinikName").value}


klinikAddressInput.onchange = getKlinikAddr()
klinikNameInput.onchange = getKlinikName()
addKlinikButton.onclick = addKlinik;





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








