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
  async getItemAction() {
    const params = this.get();
    const data = await this.model('list').getItem(params);
    this.success(data);
  }

  async updateAction() {
    const params = this.post();
    const data = await this.model('list').updateList(params);
    this.success(data);
  }

  async deleteAction() {
    const params = this.post();
    const data = await this.model('list').deleteList(params);
    this.success(data);
  }

  async addRemarkAction() {
    const params = this.post();
    const data = await this.model('list').addRemark(params);
    this.success(data);
  }

  async deleteRemarkAction() {
    const params = this.post();
    const data = await this.model('list').deleteRemark(params);
    this.success(data);
  }

  async getStarListAction() {
    const params = this.get();
    const data = await this.model('list').getStarList(params);
    this.success(data);
  }

  async getRemarkAction() {
    const params = this.get();
    const data = await this.model('list').getRemark(params);
    this.success(data);
  }

  async getItemImageAction() {
    const params = this.get();
    const data = await this.model('list').getItem(params);
    const graphs = data.graphs ? JSON.parse(data.graphs) : [];
    let currentPage = 0;
    if(params.currentPage) {
      currentPage = params.currentPage;
    }
    const graphsLs = graphs[currentPage] ? graphs[currentPage] : null;
    const total = graphs.length;
    const result = await this.model('list').getItemImage({graphsLs, currentPage, id: params.id, userId: params.userId});
    this.success({
      data: result,
      total: total
    });
  }

  
  

  
  
};
