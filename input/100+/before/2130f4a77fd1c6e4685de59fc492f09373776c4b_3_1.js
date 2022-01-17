function() {

  var template;

  beforeEach(function() {
    template = new Template({cache: true});
  });

  it('should properky handle `append` and `prepend` directives', function(done) {

    function onLoaded(err, data) {
      if(err) return done(err);
      template.render({}, onRendered)
    }

    function onRendered(err, rendered) {
      if(err) return done(err);
      rendered.trim().should.equal('foo boo doo woo loo koo');
      done();
    }

    template.loadFile(__dirname + '/../fixtures/block.kiwi', onLoaded);
  });
}