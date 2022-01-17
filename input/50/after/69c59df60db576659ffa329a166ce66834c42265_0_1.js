function () {
  police.config.set('id', null);
  police.config.set('token', null);
  police.winston.info('User has been logged out');
  police.config.save(police);
}