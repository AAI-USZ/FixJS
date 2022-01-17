function () {
  police.config.set('_id', null);
  police.config.set('token', null);
  police.winston.info('User has been logged out');
  police.config.save(police);
}