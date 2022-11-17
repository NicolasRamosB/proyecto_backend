const fs = require("fs");
const readFile = require("../util/readFile");
const saveFile = require("../util/saveFile");
const { v4: uuidv4 } = require("uuid");
class Container {
  constructor(file) {
    this.file = `db/${file}.json`;
  }

  async saveProduct(element) {
    const array = await this.getAll();
    element.id = array.length > 0 ? array[array.length - 1].id + 1 : 1;
    element.timestamp = new Date().toLocaleString();

    try {
      array.push(element);
      saveFile(this.file, array);
      return element;
    } catch (err) {
      err;
    }
  }



  async getbyId(elementId) {
    try {
      const array = await readFile(this.file);
      return array.find((element) => element.id === elementId);
    } catch (err) {
      console.log(`Element could not be found: ${err}.`);
    }
  }

  async getAll() {
    try {
      const products = await readFile(this.file);
      return products;
    } catch (err) {
      console.log(err);
    }
  }


  async update(id, data) {
    try {
      const array = await readFile(this.file);
      const current = array.find((item) => item.id === Number(id));
      const currentIndex = array.indexOf(current);
      array[currentIndex] = { ...current, ...data };
      saveFile(this.file, array);
      return array[currentIndex];
    } catch (err) {
      console.log(err);
    }
  }


  async deleteById(elementId) {
    try {
      const array = await readFile(this.file);
      saveFile(
        this.file,
        array.filter((element) => element.id !== elementId)
      );
    } catch (err) {
      console.log(`The element can not be delete: ${err}`);
    }
  }

  async deleteAll() {
    try {
      await fs.promises.writeFile(this.file, "");
    } catch (err) {
      console.log(err);
    }
  }
}

module.exports = Container;