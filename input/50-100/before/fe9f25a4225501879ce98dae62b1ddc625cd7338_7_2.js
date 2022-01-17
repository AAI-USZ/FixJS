function () {
  this.config = JSON.parse(fs.readFileSync(process.cwd() + '/config.json'));
}