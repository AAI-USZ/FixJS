function(err, code) {
    if (err) throw err;
    if (!code) return;
    var solution = new Solution({ code: code });
    solution.save(function(err) {
      if (err) throw err;
      var submission = new Submission({ solution: solution._id });
      submission.save(function(err) {
        if (err) throw err;
        req.user.submissions.push(submission);
        req.user.save(function(err) {
          if (err) throw err;
        });
      });
    });
  }