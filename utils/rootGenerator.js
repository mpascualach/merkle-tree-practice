const niceList = require("./niceList.json");
const MerkleTree = require("./MerkleTree");

const tree = new MerkleTree(niceList);
const root = tree.getRoot();

console.log({ root });
