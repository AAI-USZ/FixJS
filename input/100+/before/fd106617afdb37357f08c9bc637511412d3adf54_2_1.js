function(rule, isBegin){
    var self = this;
    var cssResult = '';
    cssResult += rule.selector.join(",\n") + " {\n";
    forEach(rule.property, function(p, i){
      cssResult += '  ' + p + ': ' + rule.value[i] + ";\n";
    });
    cssResult += "}\n";

    if (!isBegin){
      this.cssResult += cssResult;
    } else {
      this.cssResult = cssResult + this.cssResult;
    }
  }