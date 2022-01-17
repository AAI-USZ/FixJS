function(create, data) {
        // return if no element is present
        if (typeof create !== 'string')
            return console.error('First paramter must be a string to create an HTML element.');
        
        // Create element    
        var el = document.createElement(create);
        
        // Loop through and set all passed data
        for (var i in data) {
            el[i] = data[i];
        }
        
        return el;
    }