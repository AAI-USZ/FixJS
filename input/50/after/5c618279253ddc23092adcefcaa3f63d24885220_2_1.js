function(test, assert){
     conn.cql(config['create_counter_cf#cql'], function (err, res){
       assert.ifError(err);
       assert.ok(res === undefined);
       test.finish();
     });
  }