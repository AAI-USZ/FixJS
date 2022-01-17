function(nameDesc) {
    var name = '',
        desc = '',
        thisChar = '',
        inQuote = false;
    
    for (var i = 0, len = nameDesc.length; i < len; i++) {
        thisChar = nameDesc.charAt(i);
        
        if (thisChar === '\\') {
            name += thisChar + nameDesc.charAt(++i);
            continue;
        }
        
        if (thisChar === '"') {
            inQuote = !inQuote;
        }
        
        if (inQuote) {
            name += thisChar;
            continue;
        }
        
        if (!inQuote) {
            if ( /\s/.test(thisChar) ) {
                desc = nameDesc.substr(i);
                desc = desc.replace(/^[\s\-\s]+/, '').trim();
                break;
            }
            else {
                name += thisChar;
            }
        }
    }
    
    return { name: name, description: desc };
}