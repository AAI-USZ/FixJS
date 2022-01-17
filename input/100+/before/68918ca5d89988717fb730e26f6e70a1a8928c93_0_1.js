function fillCanvas(sprt, imageData, palette, size, padding){
    if (padding === undefined){
        padding = 0;
    }
    var a = 0;
    for (var y=0; y < 8*size; y++){
        for (var x=0; x < 8*size; x++) {
            var px = (x/size) >> 0;
            var py = (y/size) >> 0;
            var color_index = palette[sprt[py][px]];
            var color = sprite.get_color(color_index);
            imageData[a] = (color >> 16) & 0xff;
            imageData[a+1] = (color >> 8) & 0xff;
            imageData[a+2] = color & 0xff;
            imageData[a+3] = 0xff;
            a += 4;
        }
    }
}