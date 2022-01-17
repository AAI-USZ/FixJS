function(rule, isBegin){
    var self = this;
    var cssResult = '';
    var subs = [];
    var selectors = [];

    var index = 0;
    function findNest(){
      if (rule.property[index] instanceof Array){
        return {
          property: rule.property[index],
          value: rule.value[index]
        };
      } else {
        findNest(index++);
      }
    }

    forEach(rule.selector, function(selector){
      var sub = {
        selector: [],
        value: [],
        property: []
      };
      if (selector instanceof Array){
        sub = findNest();
        sub.selector = selector;
        index++;
        subs.push(sub);
      } else {
        selectors.push(selector);
      }
    });

    cssResult += selectors.join(",\n") + " {\n";

    forEach(rule.property, function(p, i){
      if (!(p instanceof Array)){
        cssResult += '  ' + p + ': ' + rule.value[i] + ";\n";
      }
    });

    if (!isBegin){
      this.cssResult += cssResult;
    } else {
      this.cssResult = cssResult + this.cssResult;
    }

    forEach(subs, function(sub){
      this.writeRule(sub);
    }, this);

    if (!isBegin){
      this.cssResult += "}\n";
    } else {
      this.cssResult = "}\n" + this.cssResult;
    }
  },
