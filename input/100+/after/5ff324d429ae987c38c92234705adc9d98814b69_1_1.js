function(err, staged) {
    if (err) wsapi.databaseDown(res, err);
    
    if (staged) {
      return res.json({ status: 'pending' });
    } else {
      if (wsapi.isAuthed(req, 'assertion')) {
        db.userOwnsEmail(req.session.userid, email, function(err, owned) {
          if (err) wsapi.databaseDown(res, err);
          else if (owned) res.json({ status: 'complete', userid: req.session.userid });
          else res.json({ status: 'mustAuth' });
        });
      } else {
        return res.json({ status: 'mustAuth' });
      }
    }
  }