import Chance from 'chance';
import Md5 from "md5";
module.exports = class extends think.Model {
  guid() {
    const seed = +new Date * 10000 + Math.random() * 10000;
    const chance = new Chance(seed);
    const id = chance.integer({
      min: 10000000,
      max: 1000000000
    });
    return id;
  }
  
  async getList(params) {
    const model = this.model('user');
    const field = 'id,name,phone,status,create_time,update_time';
    const reverseField = 'password,is_del,wx_id,wx_token'
    const result = await model.fieldReverse(reverseField).page(params.page,params.pageSize).select();
    return result;
  }

  async addUser(params) {
    const model = this.model('user');
    params.password = Md5(params.password);
    const userId = this.guid();
    const ls = Object.assign(params, {id: userId, status: 0, is_del: 0})
    await model.add(ls);
    const result = await this.getUserInfo(userId);
    return result;
  }

  async deleteUser(params) {
    const model = this.model('user');
    const result = await model.where({'id': params.id}).delete();
    return result;
  }

  async getUserInfo(id) {
    const model = this.model('user');
    const reverseField = 'password,is_del,wx_id,wx_token'
    const result = await model.fieldReverse(reverseField).where({'id': id}).find();
    return result;
  }

  async updateUser(params){
    const model = this.model('user');
    if(params.password) {
      params.password = Md5(params.password);
    }
    await model.where({id: params.id}).update(params);
    const result = await this.getUserInfo(params.id);
    return result;
  }
};
