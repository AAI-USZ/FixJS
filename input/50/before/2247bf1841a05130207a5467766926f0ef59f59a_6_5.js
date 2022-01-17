function (a, cb) {
  A.find().where('objectids').exists().only('dates').limit(10).exec(cb);
}