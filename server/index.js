const express = require("express");
const verifyProof = require("../utils/verifyProof");

const port = 1225;

const app = express();
app.use(express.json());

const niceList = require("../utils/niceList.json");
const MerkleTree = require("../utils/MerkleTree");

const tree = new MerkleTree(niceList);
const MERKLE_ROOT = tree.getRoot().toString();

app.post("/gift", (req, res) => {
  const { name, proof } = req.body;

  const isInTheList = verifyProof(proof, name, MERKLE_ROOT);

  if (isInTheList) {
    res.send("You got a toy robot!");
  } else {
    res.send("You are not on the list :(");
  }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});
