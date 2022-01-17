function(err) {
      if (err) throw err;
      var submission = new Submission({
        author: req.user._id,
        solution: solution._id
      });
      submission.save(function(err) {
        if (err) throw err;
      });
    }