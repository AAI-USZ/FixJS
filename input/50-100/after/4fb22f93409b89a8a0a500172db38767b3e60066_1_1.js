function(){
  var self = this;
  var style = cssom.parse(this.str);

  style = this.applyKeyframePrefixes(style);
  style.cssRules = style.cssRules.map(function(rule){
    self.applyPrefixes(rule);
    self.applySelectorMapFunctions(rule);
    return rule;
  });

  return style.toString();
}