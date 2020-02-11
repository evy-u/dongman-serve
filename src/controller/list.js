const Base = require('./base.js');

module.exports = class extends Base {
  async listAction() {
    const params = this.get();
    const data = await this.model('list').getList(params);
    this.success(data);
  }
  async addAction() {
    const params = this.post();
    const data = await this.model('list').addList(params);
    this.success(data);
  }
  async loginAction() {
    const params = this.post();
    const data = await this.model('user').loginUser(params);
    this.success(data);
  }

  async removeAction() {
    const params = this.post();
    const data = await this.model('user').deleteUser(params);
    this.success({
      affectedRows: 1
    });
  }

  async getInfoAction() {
    const params = this.post();
    const data = await this.model('user').getUserInfo(params);
    this.success(data);
  }

  async updateAction() {
    const params = this.post();
    const data = await this.model('user').updateUser(params);
    this.success(data);
  }
};
