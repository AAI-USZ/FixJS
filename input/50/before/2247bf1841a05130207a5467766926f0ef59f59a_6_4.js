function (a, cb) {
  A.find('date', a.date).where('array').$in(3).limit(10).run(cb)
}