function(element) {
    // $0 contains the element selected
    var data = $0;
    var sassValues = JSON.parse(element);
    // Make a shallow copy with a null prototype, so that sidebar does not
    // expose prototype.
    var props = Object.getOwnPropertyNames(data);
    var copy = {
        __proto__: null
    };
    // Extract the matched css rules
    var rules = window.getMatchedCSSRules(data, '')
    for (var j = 0;j<rules.length;j++) {
        // If some of the rules matches a sass debug info add it to the content
        // of the sidebar
        if (typeof sassValues[rules[j].selectorText] != 'undefined') {
            var className = rules[j].selectorText;
            // use only the file name, not the full path
            var fileName = sassValues[className]['filename'].replace(/^.*[\\\/]/, ''); 
            var linenum = sassValues[className]['linenum'];
            // Get the debug info in the form of filename:linenum
            var sassDebug =  fileName + ':' + linenum;
            copy[className] = sassDebug;
        }
    }
    return copy;
}