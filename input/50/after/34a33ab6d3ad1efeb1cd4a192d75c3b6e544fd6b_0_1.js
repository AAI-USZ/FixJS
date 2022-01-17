function(directoryName, parentPath) {
      return this.specialCaseModuleNames[directoryName] || this.underscore(directoryName);
    }