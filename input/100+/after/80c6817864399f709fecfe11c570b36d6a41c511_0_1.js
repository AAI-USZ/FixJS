function CheckPipe(log) {
      this.errors = [];
      this.jsvenv = JSV.createEnvironment('json-schema-draft-03');
      this.loadSchemas();
      this.validationCount = 0;
      CheckPipe.__super__.constructor.call(this, log);
    }