function fetchIssues(type, element, label) {
  var labels = type;
  element.attr('href', 'http://github.com/jverkoey/nimbus/issues?labels='+labels);
  GitHubAPI.RepoIssues('jverkoey', 'nimbus', labels, function(json, status) {
    if (json) {
      var text = json.length;
      element.html(label + ' ' + text);
    }
  });
}