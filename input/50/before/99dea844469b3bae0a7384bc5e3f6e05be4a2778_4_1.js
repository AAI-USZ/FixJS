function(done){
    rolodex.account.create({
      "email": "brock@sintaxi.com"}, function(errors, account){
      global.account_id   = account.id
      global.uuid = account.uuid
      done()
    })
  }