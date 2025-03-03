require('dotenv').config();
const express = require('express');
const cors = require('cors');
const multer = require('multer');
const { create } = require('ipfs-http-client');
const Web3 = require('web3');

const app = express();
app.use(cors());
app.use(express.json());

const upload = multer({ dest: 'uploads/' });

// IPFS Configuration
const ipfs = create({ host: 'ipfs.infura.io', port: 5001, protocol: 'https' });

// Ethereum Configuration
const web3 = new Web3(new Web3.providers.HttpProvider(process.env.INFURA_URL));
const contractABI = [ /* Paste Contract ABI Here */ ];
const contractAddress = "YOUR_DEPLOYED_CONTRACT_ADDRESS";
const contract = new web3.eth.Contract(contractABI, contractAddress);

// API to Upload Credential to IPFS
app.post('/upload', upload.single('file'), async (req, res) => {
    const file = req.file;
    const data = await ipfs.add(file.buffer);
    res.json({ hash: data.path });
});

// API to Issue Credential
app.post('/issue', async (req, res) => {
    const { user, name, id, issuer, privateKey } = req.body;

    const account = web3.eth.accounts.privateKeyToAccount(privateKey);
    web3.eth.accounts.wallet.add(account);

    const tx = contract.methods.issueCredential(user, name, id, issuer);
    const gas = await tx.estimateGas({ from: account.address });
    const txData = tx.encodeABI();

    const signedTx = await web3.eth.accounts.signTransaction(
        { to: contractAddress, data: txData, gas },
        privateKey
    );

    const receipt = await web3.eth.sendSignedTransaction(signedTx.rawTransaction);
    res.json({ success: true, transaction: receipt.transactionHash });
});

// API to Verify Credential
app.get('/verify/:address', async (req, res) => {
    const user = req.params.address;
    const result = await contract.methods.verifyCredential(user).call();
    res.json(result);
});

app.listen(5000, () => console.log('Server running on port 5000'));
