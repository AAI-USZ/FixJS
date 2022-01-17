function extend( _obj, _extension ) {
        
        var obj = _obj || {},
            extension = _extension || {};
            
        for( var prop in extension ) {
            obj[prop] = extension[prop];
        }
        
    }