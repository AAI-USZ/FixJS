function() {

    var namespace
      , compact
      , compactDebug;

    beforeEach(function() {
      compact = require('../../compact').createCompact({ srcPath: srcPath, destPath: destPath });
      compactDebug = require('../../compact').createCompact({ srcPath: srcPath, destPath: destPath, debug: true });
    });

    it('should error without parameter', function() {
      (function() {
        compact.middleware();
      }).should.throw('You must pass one or more arrays containing valid namespace names');

    });

    it('should succeed with empty array as first parameter', function() {
      compact.middleware([]).should.be.a('function');
    });


    it('should succeed and return nothing if a namespace has no js files added', function(done) {
      compact.addNamespace('global');
      compact.middleware(['global']).should.be.a('function');

       var req
        , res = {
            locals: function(helper) {
              helper.compactJs()[0].should.match(/\/global.js$/);
              done();
            }
          };

      compact.middleware(['global'])(req, res, function() {});

    });

    it('should not compress and concat files in debug mode', function(done) {

      compactDebug.addNamespace('global')
        .addJs('/a.js')
        .addJs('/b.js');

      var req
        , res = {
            locals: function(helper) {
              helper.compactJs()[0].should.match(/\-a.js$/);
              helper.compactJs()[1].should.match(/\-b.js$/);
              done();
            }
          };

      compactDebug.middleware(['global'])(req, res, function() {});
    });

    it('should create a helper when given valid input for a single namespace', function(done) {
      compact.addNamespace('global')
      .addJs('/a.js')
      .addJs('/b.js');

      var req
        , res = {
            locals: function(helper) {
              helper.compactJs().should.eql(['/global.js']);
              done();
            }
          };

      compact.middleware(['global'])(req, res, function() {});
    });

    it('should add the files to the compacted file in the correct order', function(done) {

      compactDebug.addNamespace('global')
        .addJs('/large.js')
        .addJs('/a.js')
        .addJs('/b.js')
        .addJs('/c.js');

      var req
        , res = {
          locals: function(helper) {
            var c = helper.compactJs();
            c[0].should.match(/\-large.js$/);
            c[1].should.match(/\-a.js$/);
            c[2].should.match(/\-b.js$/);
            c[3].should.match(/\-c.js$/);
          }
        };

      compactDebug.middleware(['global'])(req, res, function() {
        done();
      });

    });

    it('should create the correct helpers when given valid multiple namespaces', function(done) {

      compact.addNamespace('global')
        .addJs('/a.js')
        .addJs('/b.js');

        compact.addNamespace('profile')
        .addJs('/c.js');

      var req
        , res = {
          locals: function(helper) {
            helper.compactJs().should.eql(['/global-profile.js']);
            done();
          }
        };

      compact.middleware(['global', 'profile'])(req, res, function() {});
    });


    it('should create the correct helpers when given valid multiple namespaces in debug mode', function(done) {

      var compactDebug = require('../../compact').createCompact({ srcPath: srcPath, destPath: destPath, debug: true });


      compactDebug.addNamespace('global')
        .addJs('/a.js')
        .addJs('/b.js');

        compactDebug.addNamespace('profile')
        .addJs('/c.js');

      var req
        , res = {
          locals: function(helper) {
            var c = helper.compactJs();
            c[0].should.match(/\-a.js$/);
            c[1].should.match(/\-b.js$/);
            c[2].should.match(/\-c.js$/);
            done();
          }
        };

      compactDebug.middleware(['global', 'profile'])(req, res, function() {});
    });

    it('should have a correct helper when given valid input for multiple groups', function(done) {

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
    });

    it('should returned the correct helpers', function(done) {

      compact.addNamespace('global')
        .addJs('/a.js')
        .addJs('/b.js')
        .addJs('/c.js');

      compact.addNamespace('profile')
        .addJs('/b.js');

      var doneCount = 0
        , req
        , globalRes = {}
        , profileRes = {};

        globalRes.locals = function(helper) {
          helper.compactJs().should.eql(['/global.js']);
          doneCount += 1;
          if (doneCount === 2) {
            done();
          }
        };

      compact.middleware(['global'])(req, globalRes, function() {
        profileRes.locals = function(helper) {
          helper.compactJs().should.eql(['/profile.js']);
          doneCount += 1;
          if (doneCount === 2) {
            done();
          }
        };
        compact.middleware(['profile'])(req, profileRes, function() {});
      });


    });

    it('should give higher precedence to the added srcPath', function (done) {

      compact.addNamespace('alternative', altPath);
      compact.ns.alternative.addJs('a.js');

      var req
        , res = {
          locals: function (helper) {}
        };

      compact.middleware(['alternative'])(req, res, function () {

        var compacted = fs.readFileSync(destPath + '/alternative.js', 'utf8')
          , raw = fs.readFileSync(altPath + '/a.js', 'utf8');

        compacted.should.equal(raw);
        done();

      });

    });

    it('should differentiate between files with the same name from ' +
      'different locations in different namespaces', function (done) {

      var compactDebug = require('../../compact').createCompact({
        srcPath: srcPath,
        destPath: destPath,
        debug: true
      });


      compactDebug.addNamespace('global')
        .addJs('/a.js');

        compactDebug.addNamespace('alternative', altPath)
        .addJs('/a.js');

      var req
        , res = {
          locals: function(helper) {
            helper.compactJs()[0].should.not.equal(helper.compactJs()[1]);
            done();
          }
        };

      compactDebug.middleware(['global', 'alternative'])(req, res, function() {});

    });

    it('should differentiate between files with the same name from ' +
      'different locations from the same namespace', function (done) {

      var compactDebug = require('../../compact').createCompact({
        srcPath: altPath,
        destPath: destPath,
        debug: true
      });


      compactDebug.addNamespace('global')
        .addJs('/a.js')
        .addJs('/x/a.js');

      var req
        , res = {
          locals: function(helper) {
            helper.compactJs()[0].should.not.equal(helper.compactJs()[1]);
            done();
          }
        };

      compactDebug.middleware(['global'])(req, res, function() {});

    });


    it('should not cache namespace when in debug mode', function (done) {

      var content = 'var test = 1';
      fs.writeFileSync(srcPath + '/tmp.js', content);

      compactDebug.addNamespace('global')
        .addJs('/tmp.js')
        ;



      var results = [content, '']
        , i = 0
        , req
        , res = {
          locals: function(helper) {
            fs.readFileSync(destPath + helper.compactJs()[0]).toString().should.equal(results[i++]);
          }
        };

      compactDebug.middleware(['global'])(req, res, function() {
        fs.unlinkSync(srcPath + '/tmp.js');
        compactDebug.middleware(['global'])(req, res, function() {
          done();
        });
      });
    });


  }