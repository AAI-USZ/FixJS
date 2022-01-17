function(className) {
  this.message = function() {
    return [
        "Expected object to have the '" + className + "' css class, but it did not",
        "Expected object not to have the '" + className + "' css class, but it did"
    ];
  };

  return this.actual.hasClass(className);
}