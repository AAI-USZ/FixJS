function makeBorders() {
    repetitions = WIDTH/WALL_WIDTH_HEIGHT;
    
    for(var i = 0; i < repetitions; i++) {
        Crafty.e("2D, DOM, wall_top, wall").attr({
            x : i * WALL_WIDTH_HEIGHT,
            y : 0,
            w : WALL_WIDTH_HEIGHT,
            h : WALL_WIDTH_HEIGHT
        });
        Crafty.e("2D, DOM, wall_bottom, wall").attr({
            x : i * WALL_WIDTH_HEIGHT,
            y : HEIGHT - WALL_WIDTH_HEIGHT,
            w : WALL_WIDTH_HEIGHT,
            h : WALL_WIDTH_HEIGHT
        });
    }

    for(var i = 1; i < repetitions - 1; i++) {
        Crafty.e("2D, DOM, wall_left, wall").attr({
            x : 0,
            y : i * WALL_WIDTH_HEIGHT,
            w : WALL_WIDTH_HEIGHT,
            h : WALL_WIDTH_HEIGHT
        });
        Crafty.e("2D, DOM, wall_right, wall").attr({
            x : WIDTH - WALL_WIDTH_HEIGHT,
            y : i * WALL_WIDTH_HEIGHT,
            w : WALL_WIDTH_HEIGHT,
            h : WALL_WIDTH_HEIGHT
        });
    }
}