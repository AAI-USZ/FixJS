function(json, status) {
    var r = $('#repo');
    r.empty();

    var bugs = $('<dd>');
    var requests = $('<dd>');
    r.append($('<dl>')
      .append($('<dd>').html('Forks: '+json.forks))
      .append($('<dd>').html('Watchers: '+json.watchers))
      .append(bugs)
      .append(requests)
    );
    
    fetchIssues('bug', bugs, 'Bugs:');
    fetchIssues('feature', bugs, 'Feature Requests:');
  }