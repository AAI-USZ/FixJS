function(fileNames) {
        var args;
        this.testFiles = this.filesToTest(fileNames);
        args = ['--coffee', '--verbose', 'spec/'];
        if ((fileNames != null) && fileNames.length > 0) {
          args.push('--match', this.matchString(fileNames));
        }
        return this.executeJasmineOnNodeRunner(args);
      }