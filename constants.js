//export const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3"; // FOR HARDHAT NODE locally
export const contractAddress ="0x15ADA67F1132661396D85699da6BCFdDc2006D61";
export const abi = [
  {
    "inputs": [],
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  {
    "inputs": [],
    "name": "PatientPass_NotEnoughFee",
    "type": "error"
  },
  {
    "inputs": [],
    "name": "PatientPass_NotKlinik",
    "type": "error"
  },
  {
    "inputs": [],
    "name": "PatientPass_NotOwner",
    "type": "error"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "components": [
          {
            "internalType": "string",
            "name": "name",
            "type": "string"
          },
          {
            "internalType": "uint8",
            "name": "age",
            "type": "uint8"
          },
          {
            "internalType": "string",
            "name": "addr",
            "type": "string"
          }
        ],
        "indexed": true,
        "internalType": "struct PatientPass.patient",
        "name": "newPatient",
        "type": "tuple"
      }
    ],
    "name": "newPatient",
    "type": "event"
  },
  {
    "stateMutability": "payable",
    "type": "fallback"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "klinikAddress",
        "type": "address"
      },
      {
        "internalType": "string",
        "name": "klinikName",
        "type": "string"
      }
    ],
    "name": "addKlinik",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_addr",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "_klinikaddr",
        "type": "address"
      },
      {
        "internalType": "string",
        "name": "_traitement",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "_prescription",
        "type": "string"
      },
      {
        "internalType": "uint256",
        "name": "_costs",
        "type": "uint256"
      }
    ],
    "name": "addPatientRecord",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "currentKlinik",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_addr",
        "type": "address"
      }
    ],
    "name": "fund",
    "outputs": [],
    "stateMutability": "payable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_addr",
        "type": "address"
      }
    ],
    "name": "getFinalRecord",
    "outputs": [
      {
        "components": [
          {
            "components": [
              {
                "internalType": "string",
                "name": "name",
                "type": "string"
              },
              {
                "internalType": "uint8",
                "name": "age",
                "type": "uint8"
              },
              {
                "internalType": "string",
                "name": "addr",
                "type": "string"
              }
            ],
            "internalType": "struct PatientPass.patient",
            "name": "client",
            "type": "tuple"
          },
          {
            "components": [
              {
                "components": [
                  {
                    "internalType": "string",
                    "name": "traitement",
                    "type": "string"
                  },
                  {
                    "internalType": "string",
                    "name": "perscription",
                    "type": "string"
                  },
                  {
                    "internalType": "uint256",
                    "name": "cost",
                    "type": "uint256"
                  }
                ],
                "internalType": "struct PatientPass.record",
                "name": "record",
                "type": "tuple"
              }
            ],
            "internalType": "struct PatientPass.patientRecord[]",
            "name": "Record",
            "type": "tuple[]"
          }
        ],
        "internalType": "struct PatientPass.finalRecord",
        "name": "",
        "type": "tuple"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "getGlobalNetworth",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_addr",
        "type": "address"
      }
    ],
    "name": "getKlinikBalance",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "getOwner",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_addr",
        "type": "address"
      }
    ],
    "name": "getPatient",
    "outputs": [
      {
        "components": [
          {
            "internalType": "string",
            "name": "name",
            "type": "string"
          },
          {
            "internalType": "uint8",
            "name": "age",
            "type": "uint8"
          },
          {
            "internalType": "string",
            "name": "addr",
            "type": "string"
          }
        ],
        "internalType": "struct PatientPass.patient",
        "name": "",
        "type": "tuple"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_addr",
        "type": "address"
      }
    ],
    "name": "getPatientDept",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "name": "klinikAddressToName",
    "outputs": [
      {
        "internalType": "string",
        "name": "",
        "type": "string"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "s_owner",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "_name",
        "type": "string"
      },
      {
        "internalType": "uint8",
        "name": "_age",
        "type": "uint8"
      },
      {
        "internalType": "string",
        "name": "_addr",
        "type": "string"
      }
    ],
    "name": "subscribeAsPatient",
    "outputs": [],
    "stateMutability": "payable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address payable",
        "name": "_addr",
        "type": "address"
      }
    ],
    "name": "withDraw",
    "outputs": [],
    "stateMutability": "payable",
    "type": "function"
  },
  {
    "stateMutability": "payable",
    "type": "receive"
  }
]