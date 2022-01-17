function () {
  /*
   * Load options from env and argv
   *
   * Give priority to env
   * Then to arguments
   */
  nconf.env().argv();

  /*
   * Now load options from file /home/user/.policeconf
   * or the file specified in env or argv
   */
  var conf = nconf.get('conf') || path.join(process.env.HOME, '.policeconf');

  if (!path.existsSync(conf)) {
    winston.silly('Initalizing configuration file'.cyan);
    try {
      fs.writeFileSync(conf, '{}');
      fs.chmodSync(conf, 0600);
    } catch (err) {
      winston.warn('Cannot intialize configuration file.'.red.bold);
      throw err;
    }
  }

  nconf.file({ file: conf });

  /*
   * Define some defaults
   */
  nconf.defaults({});

  return this;
}