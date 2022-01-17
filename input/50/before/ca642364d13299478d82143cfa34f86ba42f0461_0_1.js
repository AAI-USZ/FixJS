function loaddata() {
  thedrawing = JSON.parse(fs.readFileSync('persist.json', 'ascii'));
}