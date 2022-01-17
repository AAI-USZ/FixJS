function(element) {
    try {
        // $0 contains the element selected
        var data = $0;
        var sassValues = JSON.parse(element);
        var copy = {
            __proto__: null
        };
        // Extract the matched css rules
        var rules = window.getMatchedCSSRules(data, '');
        if (rules) {
            for (var j = 0;j<rules.length;j++) {
                // If some of the rules matches a sass debug info add it to the content
                // of the sidebar
                if (typeof sassValues[rules[j].selectorText] !== 'undefined') {
                    var className = rules[j].selectorText;
                    // use only the file name, not the full path
                    var fileName = sassValues[className]['filename'].replace(/^.*[\\\/]/, '');
                    var linenum = sassValues[className]['linenum'];
                    // Get the debug info in the form of filename:linenum
                    var sassDebug =  fileName + ':' + linenum;
                    copy[className] = sassDebug;
                }
            }
        }
        return copy;
    } catch(err) {
       return {'error': "Error description: " + err.message };
    }
}