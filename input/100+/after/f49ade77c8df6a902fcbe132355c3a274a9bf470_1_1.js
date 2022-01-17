function(verboseSpecs, failureStacktraces) {
      var line, lines, match, spec, specName, _i, _len;
      console.log(verboseSpecs);
      console.log(failureStacktraces);
      this.extractErrorInformation(failureStacktraces);
      this.specs = [];
      lines = verboseSpecs.split("\n");
      for (_i = 0, _len = lines.length; _i < _len; _i++) {
        line = lines[_i];
        if (match = line.match(/^(\w+)/)) {
          specName = match[1];
          console.log(specName);
          spec = {
            specName: specName,
            children: [],
            passed: true
          };
          this.specs.push(spec);
        } else {
          if (this.isItBlock(line)) {
            this.addItBlock(line, spec);
          } else {
            this.addDescribeBlock(line, spec);
          }
        }
      }
      return console.log(this.specs);
    }