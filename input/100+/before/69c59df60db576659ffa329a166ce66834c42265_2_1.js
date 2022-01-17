function (err, res, body) {
    if (err) police.exit(err);
    if (res.statusCode==201) {
      police.winston.info('Authenticated to github as ' + auth.username.cyan);
      body = JSON.parse(body);

      police.config.set('name', auth.username);
      police.config.set('token', body.token);
      police.config.set('_id', body.id);
      police.config.save(police);
    } else {
      police.winston.warn("Bad credentials, Unable to login".red.bold);
      police.exit(1);
    }
  }