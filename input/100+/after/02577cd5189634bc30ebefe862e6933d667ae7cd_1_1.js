function() {
    var walkdir = require('walkdir');
    var directory, regexp, innerPaths;

    beforeEach(function() {
      directory  = createSpy("directory");
      regexp     = createSpyWithStubs("regexp", {test: null});
      innerPaths = [createSpy("inner path 1"), createSpy("inner path 2"), createSpy("inner path 3")];
      spyOn(walkdir, 'sync').andReturn(innerPaths);
    });

    it("recursively finds the directory inner paths", function() {
      PathExpander.expandDirectoryWithRegexp(directory, regexp);
      expect(walkdir.sync).toHaveBeenCalledWith(directory);
    });

    it("tests the regexp against each inner path", function() {
      PathExpander.expandDirectoryWithRegexp(directory, regexp);
      expect(regexp.test).toHaveBeenCalledWith(innerPaths[0]);
      expect(regexp.test).toHaveBeenCalledWith(innerPaths[1]);
      expect(regexp.test).toHaveBeenCalledWith(innerPaths[2]);
    });

    it("returns the paths that matched", function() {
      regexp.test.andReturnSeveral([true, false, true]);
      var paths = PathExpander.expandDirectoryWithRegexp(directory, regexp);
      expect(paths).toEqual([innerPaths[0], innerPaths[2]]);
    });
  }