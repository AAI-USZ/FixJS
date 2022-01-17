function show_screen(screen) {
    animate( screen, [
        { d : 0.0001, s : 0.5, opacity : 0.7, 'z-index' : 10000 },
        { d : 0.4,    s : 1,   opacity : 1 }
    ], function() {
    } );
}