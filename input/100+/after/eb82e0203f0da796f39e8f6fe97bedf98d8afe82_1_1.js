function (key, val) {
  if (this.subclassMatches('Domains', 'add') && envCheck()) {

    if (Object.keys(reserved).indexOf(key) >= 0) {
      error("reserves the '" + key + "' domain for " + reserved[key]);
    }

    o.domains[key] = path.resolve(val);
    if (!fs.existsSync(o.domains[key])) {
      error('could not resolve the ' + key + ' domain - ' + o.domains[key] + ' does not exist');
    }
  }
  return this;
}