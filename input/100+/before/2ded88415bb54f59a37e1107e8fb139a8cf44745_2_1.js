function(script, name, userParams) {
      var t = "";
      var start = lang_info.start.replace(/\{name\}/g, name.substr(0, name.indexOf(".")));
      for (var k in userParams) {
        start = start.replace("{" + k + "}", userParams[k]);
      }
      t += start;
      var used_vars = {};
      for (var i = 0; i < script.steps.length; i++) {
        var step = script.steps[i];
        var line = lang_info.lineForType[step.type.name];
        if (typeof line == 'undefined') {
          throw("Cannot export step of type \"" + step.type.name + "\".");
        }
        if (line instanceof Function) {
          t += line(step, lang_info.escapeValue, userParams);
          continue;
        }
        for (var k in userParams) {
          line = line.replace("{" + k + "}", userParams[k]);
        }
        var pNames = script.steps[i].getParamNames();
        for (var j = 0; j < pNames.length; j++) {
          if (step.type.getParamType(pNames[j]) == "locator") {
            line = line.replace(new RegExp("\{" + pNames[j] + "\}", "g"), lang_info.escapeValue(step.type, step[pNames[j]].getValue(), pNames[j]));
            line = line.replace(new RegExp("\{" + pNames[j] + "By\}", "g"), lang_info.locatorByForType(step.type, step[pNames[j]].getName(builder.selenium2), j + 1));
          } else {
            line = line.replace(new RegExp("\{" + pNames[j] + "\}", "g"), lang_info.escapeValue(step.type, step[pNames[j]], pNames[j]));
          }
        }
        // Depending on whether the step is negated, put in the appropriate logical nots.
        if (step.negated) {
          line = line.replace(new RegExp("\{posNot\}", "g"), "");
          line = line.replace(new RegExp("\{negNot\}", "g"), lang_info.not);
        } else {
          line = line.replace(new RegExp("\{posNot\}", "g"), lang_info.not);
          line = line.replace(new RegExp("\{negNot\}", "g"), "");
        }
        // Replace ${foo} with the necessary invocation of the variable, eg "String foo" or "var foo".
        var l2 = "";
        var hasDollar = false;
        var insideVar = false;
        var varName = "";
        for (var j = 0; j < line.length; j++) {
          var ch = line.substring(j, j + 1);
          if (insideVar) {
            if (ch == "}") {
              var spl = varName.split(":", 2);
              var varType = spl.length == 2 ? spl[1] : null;
              varName = spl[0];
              if (used_vars[varName]) {
                l2 += lang_info.usedVar(varName, varType);
              } else {
                l2 += lang_info.unusedVar(varName, varType);
                used_vars[varName] = true;
              }
              insideVar = false;
              hasDollar = false;
              varName = "";
            } else {
              varName += ch;
            }
          } else {
            // !insideVar
            if (hasDollar) {
              if (ch == "{") { insideVar = true; } else { hasDollar = false; l2 += "$" + ch; }
            } else {
              if (ch == "$") { hasDollar = true; } else { l2 += ch; }
            }
          }
        }
        line = l2;
        t += line;
      }
      t += lang_info.end;
      return t;
    }