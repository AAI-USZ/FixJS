function cacheStyleDebugInfo(sourceLink) {
            // Already cached
            if (sourceLink.styleDebugInfo) { return; }
            // Not a CSS
            if (sourceLink.type != "css") {
                sourceLink.styleDebugInfo = {};
                return;
            }

            var rules = sourceLink.object.parentStyleSheet.cssRules;
            for(var i=0; i<rules.length-1; i++) {
                var styleRule = rules[i+1];
                if (styleRule.type != CSSRule.STYLE_RULE) continue;
                styleRule.styleDebugInfo = {};

                var mediaRule = rules[i];
                if (mediaRule.type != CSSRule.MEDIA_RULE) continue;

                if (mediaRule.media.mediaText != "-sass-debug-info") continue;

                for (var j=0; j<mediaRule.cssRules.length; j++)
                {
                    var propValue = mediaRule.cssRules[j].style.
                        getPropertyValue("font-family");
                    var propName = mediaRule.cssRules[j].selectorText;
                    var quoted = /^\'.*\'$/;
                    var dquoted = /^\".*\"$/;
                    if(quoted.test(propValue) || dquoted.test(propValue)) {
                        propValue = propValue.substring(1, propValue.length-1);
                    }
                    styleRule.styleDebugInfo[propName] = propValue;
                }
            }

            sourceLink.styleDebugInfo = sourceLink.object.styleDebugInfo || {};
            return;
        }