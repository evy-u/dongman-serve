import Chance from 'chance';
import Md5 from "md5";
import fs from "fs";
import path from "path";
const rename = think.promisify(fs.rename, fs);
module.exports = class extends think.Model {
  guid() {
    const seed = new Date * 10000 + Math.random() * 10000;
    const chance = new Chance(seed);
    const id = chance.integer({
      min: 10000000,
      max: 1000000000
    });
    return id;
  };

  async uploadSingle(file) {
    const model = this.model('file');
    let type = "1";
    let lsarr = file.path.split("/");
    const filepath = path.join(think.ROOT_PATH, 'www/static/upload/' + lsarr[lsarr.length - 1]);
    let nowpath = '/static/upload/' + lsarr[lsarr.length - 1];
    think.mkdir(path.dirname(filepath));
    await rename(file.path, filepath);
    let id = await model.add({
      name: file.name,
      url: nowpath,
      type
    });
    return {
      code: 0,
      message: "上传成功",
      data: {
        id,
        name: file.name,
        url: nowpath,
        type
      }
    }
  }



  async uploadMultiple(file) {
    const model = this.model('file');
    let type = "2";
    let lsarr = file.path.split("/");
    const filepath = path.join(think.ROOT_PATH, 'www/static/upload/' + lsarr[lsarr.length - 1]);
    let nowpath = 'upload/' + lsarr[lsarr.length - 1];
    think.mkdir(path.dirname(filepath));
    await rename(file.path, filepath);
    let id = await model.add({
      name: file.name,
      url: nowpath,
      type
    });
    return {
      code: 0,
      message: "上传成功",
      data: {
        id,
        name: file.name,
        url: nowpath,
        type
      }
    }


  }
};
