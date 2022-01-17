function saveTarget(obj, user) {
  try {
    var targetFile = fhc.config.get("usertargets");
    var target = fhc.config.get("feedhenry");
    if (!target.match(/\/$/)) target = target + '/';
    var t = {target: target, user: user};
    var targets = getTargets();
    if (hasTarget(targets, t)) {
      removeTarget(t, user);
      targets = getTargets();
    }
    for(var i in obj){
      t[i] = obj[i];
    }
    targets.push(t);
 
    var persistTargets = fhc.config.get('persistTargets');
    if (('boolean' === typeof persistTargets && persistTargets) || persistTargets === 'true') {
      fs.writeFileSync(targetFile, JSON.stringify(targets));
    }
  
  } catch (x) {
    log.warn(x);
  }
}