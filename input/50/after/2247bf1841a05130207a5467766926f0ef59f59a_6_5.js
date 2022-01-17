function (a, cb) {
  A.find().where('objectids').exists().select('dates').limit(10).exec(cb);
}