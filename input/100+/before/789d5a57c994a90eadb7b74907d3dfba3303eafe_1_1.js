function(data) {
  var issues = data.issues.map(function(x) {
    return { id: x.id, subject: x.subject, status: x.status.name, progress: x.done_ratio, updated: new Date(x.updated_on) };
  })
    .sort(function(a, b) {
      var firstOrder = statusOrder[a.status] - statusOrder[b.status];
      if (firstOrder === 0) {
        return a.id - b.id;
      } else {
        return firstOrder;
      }
    });
  return {redmine: issues};
}