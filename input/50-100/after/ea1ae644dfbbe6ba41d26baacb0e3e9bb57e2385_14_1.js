function(req, res) {

  // For simplicity, all we check is if an email is verified.  We do not check that
  // the email is owned by the currently authenticated user, nor that the verification
  // secret still exists.  These checks would require more database interactions, and
  // other calls will fail in such circumstances.
  db.emailIsVerified(req.params.email, function(err, verified) {
    if (err) return wsapi.databaseDown(res, err);
    res.json({ status: verified ? 'complete' : 'pending' });
  });
}