function () {
  try { this.config = JSON.parse(fs.readFileSync(this.path + 'config.json')); }
  catch(e) { // Try default config
    console.error(e.stack);
    try { this.config = JSON.parse(fs.readFileSync(__dirname + '/default_channel_config.json')); }
    catch(e) { console.log('Failed to load default channel config!\n%s', e.stack); process.exit(); }
  }
}