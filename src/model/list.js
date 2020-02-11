import Chance from 'chance';
import Md5 from "md5";
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

  async getList(params) {
    const model = this.model('list');
    const result = await model.page(params.pageNumber,params.pageSize).select();
    const total = await model.count();
    console.log(result, total)
    return {
      list: result,
      total
    };
  }

  async addList(params) {
    const model = this.model('list');
    const result = await model.add(params);
    return Object.assign(params, {id : result})
  }

  async loginUser(params) {
    const model = this.model('user');
    params.password = Md5(params.password);
    const result = await model.where({'username': params.username}).find();
    if (JSON.stringify(result) === '{}') {
      return {
        code: -1,
        message: '该用户不存在'
      };
    }
    if (params.password === result.password) {
      return {
        code: 0,
        message: '登陆成功',
        data: {
          username: result.username,
          id: result.id,
          role: result.role
        }
      };
    } else {
      return {
        code: -1,
        message: '用户名或者密码错误'
      };
    }
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

  async updateUser(params) {
    const model = this.model('user');
    if (params.password) {
      params.password = Md5(params.password);
    }
    await model.where({id: params.id}).update(params);
    const result = await this.getUserInfo(params.id);
    return result;
  }
};
