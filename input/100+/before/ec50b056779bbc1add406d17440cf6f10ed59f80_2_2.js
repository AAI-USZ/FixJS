function handler(info, cb) {
  var bl = this.blacklist, word = info.args[1];
  switch(info.args[0]) {
    case 'add':
      if (bl.indexOf(word) === -1) {
        bl.push(word);
        fs.appendFileSync(this.file, '\n' + word);
        cb('Word added.');
      } else { cb('Word already listed.'); }
    break;
    case 'rm':
    case 'remove':
      var i = bl.indexOf(word);
      if (i !== -1) {
        bl.splice(i, 1);
        fs.writeFileSync(this.file, bl.join('\n'));
        cb('Word removed.');
      } else { cb('Word not found.'); }
    break;
    default: cb('Invalid action.');
  }
}