const Base = require('./base.js');

module.exports = class extends Base {
  indexAction() {
    // console.log(this, this.ctx, think);
    // console.log(this.ctx.config('port'), this.config('port'),  'port-config')
    console.log(this.ctx.tate )
    return this.display();
  }
};
