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
    const model = this.model('user');
    const field = 'id,name,phone,status,create_time,update_time';
    const reverseField = 'password,is_del,wx_id,wx_token';
    const result = await model.fieldReverse(reverseField).page(params.page,params.pageSize).select();
    return result;
  }

  async addUser(params) {
    const model = this.model('user');
    let ls = Object.assign(params, {role: '1'});
    if(params.username == "admin" && params.password == "admin111111") {
      ls = Object.assign(params, {role: '2'});
    }
    ls.password = Md5(params.password);
    const res = await model.where({'username': params.username}).find();
    if (JSON.stringify(res) === '{}') {
      // 该用户不存在
      await model.add(ls);
      return {
        code: 0,
        message: '注册成功'
      };
    } else {
      return {
        code: -1,
        message: '该用户已存在'
      };
    }
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
          role: result.role,
          star: result.star
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


  async handleStar(params) {
    const model = this.model('user');
    const user = await model.where({id: params.userId}).find();
    let stars = user.star ? user.star.split(",") : [];
    if(stars.indexOf(params.id) > -1) {
      stars.forEach((item, index)=> {
        stars.splice(index, 1);
      })
    }else {
      stars.push(params.id);
    }
    await model.where({id: params.userId}).update({star: stars.join(",")});
    const result = await this.getUserInfo(params.userId);
    return result;
  }

  async getHistory(params) {
    const model = this.model('user');
    const user = await model.where({id: params.userId}).find();
    let history = user.history ? JSON.parse(user.history) : [];
    if(history.length == 0) {
      return [];
    }
    let arr = [];
    history.forEach(item=> {
      arr.push("id="+item.id);
    })
    const queryStr = arr.join(" OR ");
    const modelList = this.model('list');
    const result = await modelList.where(queryStr).select();
    result.forEach(item=> {
      history.forEach(ls=> {
        if(item.id == ls.id) {
          item.currentPage = ls.currentPage;
          if(ls.seconds) {
            item.seconds = ls.seconds;
          }
        }
      })
    })
    return result;
  }
  
};
