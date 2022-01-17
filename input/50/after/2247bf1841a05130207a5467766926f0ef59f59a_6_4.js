function (a, cb) {
  A.where('date', a.date).where('array').in(3).limit(10).exec(cb)
}