function(key, val) {
  var cur = {}; // TODO: Allow multiple deployments
  
  cur[key] = val;
  
  fs.writeFileSync(this.path + '/.dpd/deployments.json', JSON.stringify(cur));
}