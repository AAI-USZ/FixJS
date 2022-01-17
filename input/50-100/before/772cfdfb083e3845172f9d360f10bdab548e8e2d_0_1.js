function(config) {
  var isTravis = Boolean(process.env.CI);
  if (isTravis) {
    // see: http://about.travis-ci.org/docs/user/database-setup/
    config = _.extend({
      user: 'root',
    }, config);
  } else {
    config = _.extend({
      host     : process.env.MYSQL_HOST,
      port     : process.env.MYSQL_PORT,
      user     : process.env.MYSQL_USER,
      password : process.env.MYSQL_PASSWORD,
    }, config)
  }

  return Mysql.createConnection(config);
}