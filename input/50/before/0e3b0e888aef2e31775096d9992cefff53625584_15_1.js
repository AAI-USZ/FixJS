function test(domain, rule_options, callback){
  var r = new Rule(rule_options, core);
  r.isAllowed({domain:domain}, _w(callback));
}