function (a, cb) {
  A.where('number', a.number).sort('-_id').limit(10).exec(cb)
}