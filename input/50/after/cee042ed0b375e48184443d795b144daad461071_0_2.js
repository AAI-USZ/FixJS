function hide_screen(screen) {
    animate( screen, [
        { d : 0.4, s : 0.7, opacity : 0 }
    ], function() {
        p.css( screen, { 'z-index' : 100 } );
    } );
}