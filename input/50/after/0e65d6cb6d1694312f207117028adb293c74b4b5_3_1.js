function ()
{
  this.logger.info('Core init(). Kicking off Super Startup');
  // start authentication process
  this.user.init();
}