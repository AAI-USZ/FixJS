function() {

    it("should return relative vendor path for libs in node_modules", function(){
      var dest = core.buildPath("/home/user/code/node/assembly/node_modules/underscore/underscore.js");
      dest.should.eql("js/vendor/underscore/underscore.js");
    });

    it("should return absolute vendor path for libs in node_modules", function(){
      var dest = core.buildPath("/home/user/code/node/assembly/node_modules/underscore/underscore.js", {fullpath: true});
      dest.should.eql(core.destJSRoot + "/vendor/underscore/underscore.js");
    });

    it('should return relative build/vendor path for src/vendor lib', function() {
      var dest = core.buildPath(core.jsRoot + "/vendor/handlebars.runtime.js");
      dest.should.eql("js/vendor/handlebars.runtime.js");
    });

    it('should return absolute build/vendor path for src/vendor lib', function() {
      var dest = core.buildPath(core.src + "/vendor/handlebars.runtime.js", {fullpath : true});
      dest.should.eql(core.destJSRoot + "/vendor/handlebars.runtime.js");
    });

    it('should return relative dest path for src file', function() {
      var dest = core.buildPath(core.src +"/foo.js");
      dest.should.eql("foo.js");
    });

    it('should return relative dest path without extension for src file', function() {
      var dest = core.buildPath(core.src +"/foo.js", {extension: false});
      dest.should.eql("foo");
    });

    it('should return absolute dest path for src file', function() {
      var dest = core.buildPath(core.src +"/foo.js", {fullpath : true});
      dest.should.eql(core.dest + "/foo.js");
    });

    it('should return absolute dest path with no extension for for src file', function() {
      var dest = core.buildPath(core.src +"/foo.js", {fullpath : true, extension: false});
      dest.should.eql(core.dest + "/foo");
    });

    it('should return absolute path with version string and no extension', function() {
      var dest = core.buildPath(core.src +"/foo.js", {fullpath : true, extension: false, version: "v1"});
      dest.should.eql(core.dest + "/foo-v1");
    });

    it('should return absolute path with version string and extension', function() {
      var dest = core.buildPath(core.src +"/foo.js", {fullpath : true, extension: true, version: "v1"});
      dest.should.eql(core.dest + "/foo-v1.js");
    });

    it('should return relative path with version string and no extension', function() {
      var dest = core.buildPath(core.src +"/foo.js", {fullpath : false, extension: false, version: "v1"});
      dest.should.eql("foo-v1");
    });

    it('should return jpg for image with jpg extension', function() {
      var dest = core.buildPath(core.src +"/images/cathat.jpg");
      dest.should.eql("images/cathat.jpg");
    });
  }