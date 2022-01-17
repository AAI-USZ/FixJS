function(done) {

      compact.addNamespace('global')
        .addJs('/a.js');

      compact.addNamespace('blog')
        .addJs('/b.js');

        compact.addNamespace('profile')
        .addJs('/c.js');

      var req
        , res = {
          locals: function(helper) {
            helper.compactJs().should.eql(['/global-profile.js', '/blog.js']);
            done();
          }
        };

      compact.middleware(['global', 'profile'], ['blog'])(req, res, function() {});
    }