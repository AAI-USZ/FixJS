function _findAllFunctionsInText(text) {
        var result = [];
        var regexA = new RegExp(/(function\b)([^)]+)\b\([^)]*\)/gi);  // recognizes the form: function functionName()
        var regexB = new RegExp(/(\w+)\s*=\s*function\s*(\([^)]*\))/gi); // recognizes the form: functionName = function()
        var regexC = new RegExp(/((\w+)\s*:\s*function\s*\([^)]*\))/gi); // recognizes the form: functionName: function()
        var match;
        
        while ((match = regexA.exec(text)) !== null) {
            result.push({
                functionName: match[2].trim(),
                offset: match.index
            });
        }
        
        while ((match = regexB.exec(text)) !== null) {
            result.push({
                functionName: match[1].trim(),
                offset: match.index
            });
        }
        
        while ((match = regexC.exec(text)) !== null) {
            result.push({
                functionName: match[2].trim(),
                offset: match.index
            });
        }
        
        return result;
    }