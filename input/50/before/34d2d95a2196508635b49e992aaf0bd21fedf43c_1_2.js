function test_tie(mod, callback){
  assert.equal(mod.require('pi'), Math.PI);
  callback();
}