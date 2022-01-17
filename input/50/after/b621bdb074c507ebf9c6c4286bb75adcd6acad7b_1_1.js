function(s){
  return _.reduce(s.split('.'), function(memo, val){
    return memo += '[' + JSON.stringify(val) + ']';
  }, '');
}