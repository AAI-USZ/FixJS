function() {
    return this.statusCode == 500 || this.type === "ProvisionedThroughputExceededException";
  }