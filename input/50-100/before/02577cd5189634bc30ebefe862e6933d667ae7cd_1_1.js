function() {
      directory  = createSpy("directory");
      regexp     = createSpyWithStubs("regexp", {test: null});
      innerPaths = [createSpy("inner path 1"), createSpy("inner path 2"), createSpy("inner path 3")];
      spyOn(findit, 'sync').andReturn(innerPaths);
    }