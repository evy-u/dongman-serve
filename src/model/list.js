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
    let type = params.type;
    let queryObj = {};
    if(type && type !== "全部") {
      queryObj.type = type;
    }
    if(params.keyword) {
      queryObj.name = ["like", params.keyword];
    }
    const result = await model.page(params.pageNumber,params.pageSize).where(queryObj).select();
    const total = await model.where(queryObj).count("id");
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

  async getItem(params) {
    const model = this.model('list');
    const result = await model.where({'id': params.id}).find();
    return result;
    
  }

  async updateList(params) {
    const model = this.model('list');
    await model.where({id: params.id}).update(params);
    const result = await this.getItem({id: params.id});
    return result;
  }

  async deleteList(params) {
    const model = this.model('list');
    const result = await model.where({'id': params.id}).delete();
    return result;
  }

  async addRemark(params) {
    const model = this.model('list');
    const detail = await model.where({'id': params.id}).find();
    let remarks = detail.remark ? JSON.parse(detail.remark) : [];
    remarks.push({
      content: params.content,
      username: params.username,
      update_Date: params.update_Date,
      remarkId: this.guid()
    });
    await model.where({id: params.id}).update({remark: JSON.stringify(remarks)});
    const result = await this.getItem({id: params.id});
    return result;
  }

  async deleteRemark(params) {
    const model = this.model('list');
    const detail = await model.where({'id': params.id}).find();
    let remarks = detail.remark ? JSON.parse(detail.remark) : [];
    remarks.forEach((element,index) => {
      if(element.remarkId == params.remarkId) {
        remarks.splice(index, 1);
      }
    });
    await model.where({id: params.id}).update({remark: JSON.stringify(remarks)});
    const result = await this.getItem({id: params.id});
    return result;
  }

  async getStarList(params) {
    const model = this.model('list');
    const userModel = this.model("user");
    const user = await userModel.where({'id': params.userId}).find();
    const star = user.star.split(",");
    const arr = [];
    star.forEach(item=> {
      arr.push("id="+item);
    })
    const queryStr = arr.join(" OR ");
    const result = model.where(queryStr).select();
    return result;
  }


  async getRemark(params) {
    const model = this.model('list');
    const result = await model.where({id: params.id}).find();
    let remark = result.remark ? JSON.parse(result.remark) : [];
    return remark;
  }

  async getItemImage(params) {
    // 获取动漫内容数据
    const images = params.graphsLs.images;
    const ls = images.split(",");
    const arr = [];
    ls.forEach(item=> {
      arr.push("id="+item);
    })
    const queryStr = arr.join(" OR ");
    const model = this.model('file');
    const result = await model.where(queryStr).order("id ASC").select();
    let imagesArr = [];
    result.forEach(item=> {
      imagesArr.push('/static/' + item.url);
    })

    // 保存观看历史
    const id = params.id;
    const modelUser = this.model("user");
    const userId = params.userId;
    const currentPage = params.currentPage;
    const user = modelUser.where({id: userId}).find();
    const history = user.history ? JSON.parse(user.history) : [];
    let isHas = history.some(item=> {
      return item.id == id;
    })
    if(isHas) {
      history.forEach(item=> {
        if(item.id == id) {
          item.currentPage = currentPage;
        }
      })
    }else {
      history.push({
        id,
        currentPage
      })
    }
    modelUser.where({id: userId}).update({history: JSON.stringify(history)});
    return {
      urls: imagesArr,
      num: params.graphsLs.num,
      name: params.graphsLs.name
    };
  }
  
};
