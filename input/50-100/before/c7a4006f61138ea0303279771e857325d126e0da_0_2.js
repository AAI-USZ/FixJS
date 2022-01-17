function(err) {
      if (err) throw err;
      var submission = new Submission({ solution: solution._id });
      submission.save(function(err) {
        if (err) throw err;
        req.user.submissions.push(submission);
        req.user.save(function(err) {
          if (err) throw err;
        });
      });
    }