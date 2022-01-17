function writeLine(l,openStreams,dir){
  //console.log('writeLine')
  var o = openStreams[l.file];
  if(!openStreams[l.file]) {
    o = openStreams[l.file] = {};
    var hash = crypto.createHash('sha1');
    hash.update(l.file);
    var sha = hash.digest('hex');
    o.lname = dir+(sha+'_'+path.basename(l.file).replace(/^[0-9a-zA-Z_-.]+/g,'_'));
    o.ws = fs.createWriteStream(o.lname,{ flags: 'a+'});
    o.started = Date.now();
  }

  o.updated = Date.now();
  o.ws.write(JSON.stringify(l)+"\n");
}