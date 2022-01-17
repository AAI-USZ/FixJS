function(title) {
        title = dictionary.normalise(title);
        
        if ( hasOwnProperty.call(_definitions, title) ) {
           return _definitions[title];
        }
        
        return false;
    }