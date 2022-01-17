function(err, code) {
    if (err) throw err;
    if (!code) return;
    var solution = new Solution({ code: new Buffer(code) });
    solution.save(function(err) {
      if (err) throw err;
      var submission = new Submission({
        author: req.user._id,
        solution: solution._id
      });
      submission.save(function(err) {
        if (err) throw err;
      });
    });
  }