const fs = require("fs/promises");

const saveFile = async (file, array) => {
  try {
    return await fs.writeFile(file, JSON.stringify(array, null, 2));

  }
  catch (err) {
    console.error(err.message);
  }
}

module.exports = saveFile