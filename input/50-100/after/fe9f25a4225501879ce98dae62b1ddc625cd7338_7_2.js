function () {
  try {
    this.config = JSON.parse(fs.readFileSync(process.cwd() + '/config.json'));
  } catch(e) {
    console.error(this.name.red, 'Failed to load config.');
    this.log.exception(e, 'Network ' + name + ' failed to load config.');
  }
}