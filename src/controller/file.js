const Base = require('./base.js');

module.exports = class extends Base {
  // 单文件上传
  async uploadSingleAction() {
    const file = this.file("avator");
    const data = await this.model('file').uploadSingle(file);
    this.success(data);
  }
  // 多文件上传
  async uploadMultipleAction() {
    const file = this.file();
    const data = await this.model('file').uploadMultiple(file.file);
    this.success(data);
  }
};
