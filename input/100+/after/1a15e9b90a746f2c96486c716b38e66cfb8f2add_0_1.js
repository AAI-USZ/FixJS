function( target_div ) {
    if( typeof target_div == 'string' )
        target_div = dojo.byId( target_div );

    var target_dims = dojo.coords( target_div );


    // make an inner container that's styled to compensate for the
    // 12px edge-padding that dojox.charting has builtin that we can't
    // change, making the tick marks align correctly with the images
    var label_digits = Math.floor( Math.log(this.max+1)/Math.log(10))+1;

    var container = dojo.create(
        'div', {
            style: {
                   position: 'absolute',
                   left: "-9px",
                   bottom: "-14px",
                   width: (30+4*label_digits)+"px",
                   height: (target_dims.h+27)+"px",
                   overflow: 'hidden'
            }
        },
        target_div );

    try {
        var chart1 = new Chart( container, {fill: 'transparent'} );
        chart1.addAxis( "y", {
                            vertical: true,
                            fill: 'transparent',
                            min: this.min,
                            max: this.max,
                            fixLower: this.fixBounds ? 'major' : 'none',
                            fixUpper: this.fixBounds ? 'major' : 'none'
                            // minorTickStep: 0.5,
                            // majorTickStep: 1
                            //labels: [{value: 1, text: "One"}, {value: 3, text: "Ten"}]
                        });
        chart1.addPlot("default", {type: "Bubble", fill: 'transparent'});
        chart1.render();

        // hack to remove a undesirable opaque white rectangle i can't
        // coax dojox.charting to leave out
        var undesirable_rect = container.childNodes[0].childNodes[1];
        if( undesirable_rect )
            undesirable_rect.setAttribute('fill-opacity',0);

        this.scaler = chart1.axes.y.scaler;
    } catch (x) {
        console.error(x+'');
        console.error("Failed to draw Ruler with SVG, your browser may not support the necessary technology.");
        target_div.removeChild( container );
    }
}