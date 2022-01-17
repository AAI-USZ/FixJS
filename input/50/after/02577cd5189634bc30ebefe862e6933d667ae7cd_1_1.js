function() {
      PathExpander.expandDirectoryWithRegexp(directory, regexp);
      expect(walkdir.sync).toHaveBeenCalledWith(directory);
    }