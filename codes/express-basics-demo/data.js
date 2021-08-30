const fs = require("fs");
const { promisify } = require("util");
const path = require("path");

const readFile = promisify(fs.readFile);
const writeFile = promisify(fs.writeFile);

const dataPath = path.join(__dirname, "./data.json");

exports.getData = async () => {
  const data = await readFile(dataPath, "utf-8");
  return JSON.parse(data);
};

exports.saveData = async (db) => {
  const data = JSON.stringify(db, null, " ");
  await writeFile(dataPath, data);
};
