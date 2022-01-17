function(fileNames) {
        var args;
        args = ['--coffee', '--verbose', 'spec/'];
        this.testFiles = this.filesToTest(fileNames);
        if ((fileNames != null) && fileNames.length > 0) {
          args.push('--match', this.matchString(fileNames));
        }
        return this.executeJasmineOnNodeRunner(args);
      }