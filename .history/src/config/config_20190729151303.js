// default config
module.exports = {
  workers: 1,
  port: 8366,
  errnoField: 'code', // errno field
  errmsgField: 'msg', // errmsg field
  defaultErrno: 114, // default errno
  // redis: {
  //   host: '127.0.0.1',
  //   port: 6379
  // }
};
