let contract;
let web3;
const contractAddress = "YOUR_DEPLOYED_CONTRACT_ADDRESS";
const contractABI = [
    {
        "inputs": [
            { "internalType": "address", "name": "_user", "type": "address" },
            { "internalType": "string", "name": "_name", "type": "string" },
            { "internalType": "string", "name": "_id", "type": "string" },
            { "internalType": "string", "name": "_issuer", "type": "string" }
        ],
        "name": "issueCredential",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [{ "internalType": "address", "name": "_user", "type": "address" }],
        "name": "verifyCredential",
        "outputs": [
            { "internalType": "string", "name": "", "type": "string" },
            { "internalType": "string", "name": "", "type": "string" },
            { "internalType": "string", "name": "", "type": "string" },
            { "internalType": "bool", "name": "", "type": "bool" }
        ],
        "stateMutability": "view",
        "type": "function"
    }
];

async function init() {
    if (window.ethereum) {
        web3 = new Web3(window.ethereum);
        await window.ethereum.request({ method: 'eth_requestAccounts' });
        const accounts = await web3.eth.getAccounts();
        contract = new web3.eth.Contract(contractABI, contractAddress);
        console.log("Connected to Ethereum: ", accounts[0]);
    } else {
        alert("Please install MetaMask to use this application.");
    }
}

async function issueCredential() {
    const name = document.getElementById("name").value;
    const idNumber = document.getElementById("idNumber").value;
    const accounts = await web3.eth.getAccounts();
    
    await contract.methods.issueCredential(accounts[0], name, idNumber, "Blockchain Authority")
        .send({ from: accounts[0] });
    
    alert("Credential Issued Successfully!");
}

async function verifyCredential() {
    const address = document.getElementById("verifyAddress").value;
    const result = await contract.methods.verifyCredential(address).call();
    
    if (result[3]) {
        document.getElementById("verificationResult").innerText = `✅ Verified: ${result[0]}, ID: ${result[1]}, Issued By: ${result[2]}`;
    } else {
        document.getElementById("verificationResult").innerText = "❌ No Credential Found";
    }
}

window.onload = init;
