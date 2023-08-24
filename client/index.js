const axios = require("axios");
const niceList = require("../utils/niceList.json");
const MerkleTree = require("../utils/MerkleTree");

const readline = require("readline");

const serverUrl = "http://localhost:1225";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

async function main() {
  const tree = new MerkleTree(niceList); // turns nicelist into merkle tree

  rl.question("Which name would you like me to check? \n", async (name) => {
    if (!niceList.includes(name)) {
      console.log("You are not on the list :(");
      rl.close();
      return;
    }

    const index = niceList.findIndex((n) => n === name);
    const proof = tree.getProof(index);

    const { data: gift } = await axios.post(`${serverUrl}/gift`, {
      name: name,
      proof: proof,
    });

    console.log({ gift });
    rl.close();
  });
}

main();
