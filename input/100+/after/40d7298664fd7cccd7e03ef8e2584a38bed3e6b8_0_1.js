function(callback) { return function(req, res) {
  if (!req.user) return res.redirect('/login');
  Submission.findById(req.params.id, function(err, submission) {
    if (err) throw err;
    if (!submission || submission.author != req.user.id)
      // TODO: show error to user
      return res.redirect('/submit');
    Solution.findById(submission.solution, function(err, solution) {
      if (err) throw err;
      res.header('Content-Type', 'text/plain');
      res.send(callback(solution));
    });
  });
}; }