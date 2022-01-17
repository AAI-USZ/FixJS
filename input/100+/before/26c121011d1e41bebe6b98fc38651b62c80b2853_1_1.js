function(done) {

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
  }