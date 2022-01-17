function (a, cb) {
  A.where('number', a.number).sort('_id', -1).limit(10).run(cb)
}