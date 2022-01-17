function() {
    var db = start()
    var User = db.model('User')
    var tj = new User({ name: 'tj',  pets: []})
    tj.pets.push.should.equal(tj.pets.$push)
    db.close()
  }