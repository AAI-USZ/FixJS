function() {
        var failureStacktraces, jasmineFailures, verboseSpecs;
        if (this.isSyntaxError(this.message)) {
          return this.handleSyntaxError();
        }
        jasmineFailures = this.message.match(/(.+\n.\[3[12]m[\s\S]*)Failures:\s([\s\S]*)\n+Finished/m);
        if (jasmineFailures != null) {
          this.resetTestStatus();
          verboseSpecs = jasmineFailures[1];
          failureStacktraces = jasmineFailures[2];
          return this.handleFailures(failureStacktraces, verboseSpecs);
        } else {
          return this.allSpecsPass();
        }
      }