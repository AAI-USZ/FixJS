function(){
    var fn = env();
    fn('foo', 'bar').should.equal('bar');
    process.env.FOO = 'baz';
    fn('foo', 'bar').should.equal('baz');
    process.env.DEV_UI = 'yes';
    fn('dev ui', 'no').should.equal('yes');
  }