function(colors){
    if (colors == null || !colors.length){
        return pv.Colors.category10;
    }
	
    colors = def.array(colors);
	
    return function() {
        var scale = pv.colors(colors); // creates a color scale with a defined range
        scale.domain.apply(scale, arguments); // defines the domain of the color scale
        return scale;
    };
}