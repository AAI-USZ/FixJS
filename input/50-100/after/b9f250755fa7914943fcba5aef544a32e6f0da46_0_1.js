function(problem, advice) {
  var challenge = 'OAuth realm="' + this._realm + '"';
  if (problem) {
    challenge += ', oauth_problem="' + utils.encode(problem) + '"';
  }
  if (advice && advice.length) {
    challenge += ', oauth_problem_advice="' + utils.encode(advice) + '"';
  }
  
  return challenge;
}