function authenticateSession(session, uid, level, duration_ms) {
  if (['assertion', 'password'].indexOf(level) === -1)
    throw "invalid authentication level: " + level;

  // if the user is *already* authenticated as this uid with an equal or better
  // level of auth, let's not lower them.  Issue #1049
  if (session.userid === uid && session.auth_level === 'password' &&
      session.auth_level !== level) {
    logger.info("not resetting cookies to 'assertion' authenticate a user who is already password authenticated");
  } else {
    if (duration_ms) {
      session.setDuration(duration_ms);
    }
    session.userid = uid;
    session.auth_level = level;
  }
}