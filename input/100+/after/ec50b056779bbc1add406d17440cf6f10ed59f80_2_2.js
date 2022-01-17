function handler(info, cb) {
  var word = info.args[1];
  switch(info.args[0]) {
    case '+':
    case 'add':
      if (!this.blacklist.has(word)) {
        this.blacklist.add(word);
        this.io.save();
        cb('Word added.');
      } else { cb('Word already listed.'); }
    break;
    case '-':
    case 'rm':
    case 'remove':
      if (this.blacklist.has(word)) {
        this.blacklist.del(word);
        this.io.save();
        cb('Word removed.');
      } else { cb('Word not found.'); }
    break;
    default: cb('Invalid action.');
  }
  console.dir(this.config);
}