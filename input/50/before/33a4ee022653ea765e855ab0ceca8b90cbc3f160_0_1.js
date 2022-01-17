function(content) {
  this.message = function() {
    return [
        "Expected page to have '" + content + "' within it's content, but it did not",
        "Expected page not to have '" + content + "' within it's content, but it did"
    ];
  };

  return this.actual.hasContent(content) >= 0;
}