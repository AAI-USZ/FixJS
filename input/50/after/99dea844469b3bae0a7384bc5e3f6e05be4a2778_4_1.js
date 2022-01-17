function(done){
    rolodex.account.set(null, {
      "email": "brock@sintaxi.com"}, function(errors, account){
      global.account_id   = account.id
      global.uuid = account.uuid
      done()
    })
  }