function (a, cb) {
  A.where('date', a.date).select('string bool').sort('date').limit(10).exec(cb)
}