function(title) {
        canonicalName = title.toLowerCase();
            
        if ( hasOwnProperty.call(_synonyms, canonicalName) ) {
            return _synonyms[canonicalName];
        }
        
        return canonicalName;
    }