function saveTarget(obj) {
  try {
    var targetFile = fhc.config.get("usertargets");
    var target = fhc.config.get("feedhenry");
    if (!target.match(/\/$/)) target = target + '/';
    var targets = getTargets();    
    var t = {target: target};
    for(var i in obj){
      t[i] = obj[i];
    }
    if(!hasTarget(targets, t)) {
      log.silly(t, "Adding target");
      targets.push(t);
      var persistTargets = fhc.config.get('persistTargets');
      if (('boolean' === typeof persistTargets && persistTargets) || persistTargets === 'true') {
        fs.writeFileSync(targetFile, JSON.stringify(targets));
      }
    }
  } catch (x) {
    log.warn(x);
  }
}