function(title) {
        canonicalName = title.toLowerCase();
            
        if ( hasOwnProp.call(_synonyms, canonicalName) ) {
            return _synonyms[canonicalName];
        }
        
        return canonicalName;
    }