function (a, cb) {
  A.where('date', a.date).select('string').limit(10).run(cb)
}