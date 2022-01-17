function(title) {
        title = dictionary.normalise(title);
        
        if ( hasOwnProp.call(_definitions, title) ) {
           return _definitions[title];
        }
        
        return false;
    }