function (a, cb) {
  A.where('date', a.date).select('string', 'bool').asc('date').limit(10).run(cb)
}