const requireRule = {
  string: true,
  required: true
};
module.exports = class extends think.Logic {
  listAction() {
    this.allowMethods = 'get';
    const rules = {
      page: {
        int: true, // 字段类型为 int 类型
        required: true, // 字段必填
        default: 1 // 字段默认值为
      },
      pageSize: {
        int: true, // 字段类型为 int 类型
        required: true, // 字段必填
        default: 10 // 字段默认值为
      }
    };
    const flag = this.validate(rules);
    if (!flag) {
      return this.fail('sorry，请求参数格式有误', []);
    }
  }

  addAction() {
    this.allowMethods = 'post';
    const rules = {
      username: requireRule,
      password: requireRule
    };
    const flag = this.validate(rules);
    if (!flag) {
      return this.fail('sorry，请求参数格式有误', {});
    }
  }

  loginAction() {
    this.allowMethods = 'post';
    const rules = {
      username: requireRule,
      password: requireRule
    };
    const flag = this.validate(rules);
    if (!flag) {
      return this.fail('sorry，请求参数格式有误', {});
    }
  }

  getInfoAction() {
    this.allowMethods = 'post';
    const rules = {
      id: requireRule
    };
    const flag = this.validate(rules);
    if (!flag) {
      return this.fail('sorry，请求参数格式有误', {});
    };
  }

  removeAction() {
    this.allowMethods = 'post';
    const rules = {
      id: requireRule
    };
    const flag = this.validate(rules);
    if (!flag) {
      return this.fail('sorry，请求参数格式有误', {});
    }
  }

  updateAction() {
    const rules = {
      id: {
        required: true,
        method: 'POST'
      }
    };
    const flag = this.validate(rules);
    if (!flag) {
      return this.fail('缺少用户ID', {});
    }
  }
};
