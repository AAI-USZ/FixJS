function() {

  var template;

  beforeEach(function() {
    template = new Template({cache: false});
  });

  it('should be properly handeled.', function(done) {

    function onLoaded(err, data) {
      if(err) return done(err);
      template.render({}, onRendered)
    }

    function onRendered(err, rendered) {
      if(err) return done(err);
      rendered.trim().should.equal('foo bar woo doo loo roo');
      done();
    }

    template.loadFile(__dirname + '/../fixtures/parent.kiwi', onLoaded);
  });
  
  it('should throw an error when used outside of a block tag.', function(done) {
    
    template.template = '{{parent}}';
    template.render({}, function(err, rendered) {
      err.message.should.equal('Compilation error: `parent` tag must be immediate child of a `block` tag.');
      done();
    })
    
  });
  
  it('should work properly with variables and multiple parent tags.', function(done) {
    
    template.loadAndRender(__dirname + '/../fixtures/parent_var.kiwi', {somevar: 'hello', somevar2: 'kiwi'}, function(err, rendered) {
      if(err) return done(err);
      rendered.should.equal('before afterbefore kiwi inside hello stillinside beforeafter inside hello stillinside after');
      done();
    });
    
  });
  
}