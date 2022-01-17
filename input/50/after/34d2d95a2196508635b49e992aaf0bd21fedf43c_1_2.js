function test_tie(mod, callback){
  assert.equal(mod.require('proc'), process);
  assert.equal(mod.require('env'), process.env);
  callback();
}