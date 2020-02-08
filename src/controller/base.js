module.exports = class extends think.Controller {
  __before() {
    /**
     * access-cross
     */
    this.ctx.set('Access-Control-Allow-Origin', '*')
  }
};
