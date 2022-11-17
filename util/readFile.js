const fs = require("fs/promises");

const readFile = async (file) => {
  try {
    const data = await fs.readFile(file, {encoding: "utf8"});
    return !data ? [] : JSON.parse(data);

  } catch (err) {
    console.error(err.message);
  }
}

module.exports = readFile;