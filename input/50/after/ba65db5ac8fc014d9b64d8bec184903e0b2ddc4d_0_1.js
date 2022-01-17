function(key, val) {
  var cur = this.getConfig() || {};
  
  cur[key] = val;
  
  fs.writeFileSync(this.path + '/.dpd/deployments.json', JSON.stringify(cur));
}