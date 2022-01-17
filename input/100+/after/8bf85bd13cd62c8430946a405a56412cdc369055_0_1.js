function parseRule(rule) {
            var debugInfo = {};
            for (var j=0; j<rule.cssRules.length; j++) {
                var propValue = rule.cssRules[j].style.
                    getPropertyValue("font-family");
                var propName = rule.cssRules[j].selectorText;
                var quoted = /^\'.*\'$/;
                var dquoted = /^\".*\"$/;
                if(quoted.test(propValue) || dquoted.test(propValue)) {
                    propValue = propValue.substring(1, propValue.length-1);
                }
                debugInfo[propName] = propValue;
            }
            return debugInfo;
        }