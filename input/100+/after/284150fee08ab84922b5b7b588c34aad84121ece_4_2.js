function(colors){
    if(colors == null){
        return null;
    }
    
    if(typeof colors === 'function') {
        if(!colors.hasOwnProperty('range')){
            // Assume already a color scheme (a color scale factory)
            return colors;
        }
        
        // A protovis color scale
        // Obtain its range colors array and discard the scale function.
        colors = colors.range();
    } else {
        colors = def.array.as(colors);
    }
    
    if(!colors.length){
        return null;
    }
    
    return function() {
        var scale = pv.colors(colors); // creates a color scale with a defined range
        scale.domain.apply(scale, arguments); // defines the domain of the color scale
        return scale;
    };
}