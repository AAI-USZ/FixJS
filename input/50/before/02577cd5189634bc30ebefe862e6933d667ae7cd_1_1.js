function() {
      PathExpander.expandDirectoryWithRegexp(directory, regexp);
      expect(findit.sync).toHaveBeenCalledWith(directory);
    }