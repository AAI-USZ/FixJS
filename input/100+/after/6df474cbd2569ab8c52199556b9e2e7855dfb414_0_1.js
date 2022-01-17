function ( p, deb ) {
    var x = 0, y = 0, round = vml.round;

    if ( !p ) { return p; }
    if ( p in vml._pathcache ) { return vml._pathcache[p]; }

    // clean up overly detailed fractions (8.526512829121202e-148) 
    p = p.replace( /(\d*)((\.*\d*)(e ?-?\d*))/g, "$1");

    var bits = p.match( /([MLHVCSQTAZ][^MLHVCSQTAZ]*)/gi );
    var np = [], lastcurve = [];
    for ( var i=0,bl=bits.length; i<bl; i++ ) {
      var itm  = bits[i]
        , op   = itm.charAt( 0 )
        , args = itm.substring( 1 ).split( /[, ]/ )
        , argi = 0
        ;
      switch ( op ) {

        case 'M':  // moveto (absolute)
          op = 'm';
          x = round( args[0] );
          y = round( args[1] );
          args = [ x, y ];
          break;
        case 'm':  // moveto (relative)
          op = 'm';
          x += round( args[0] );
          y += round( args[1] );
          args = [ x, y ];
          break;

        case "A": // TODO: arc (absolute):
          // SVG: rx ry x-axis-rotation large-arc-flag sweep-flag x y
          // VML: http://www.w3.org/TR/NOTE-VML
          /*var rx = round( args[0] ), 
              ry = round( args[1] ), 
              xrot = round( args[2] ), 
              lrg = round( args[3] ), 
              sweep = round( args[4] );*/
          op = 'l';
          args = [ (x = round( args[5] )),
                   (y = round( args[6] )) ];
          break;

        case "L": // lineTo (absolute)
          op = '';
          while ( argi < args.length ) {
            np.push( 'l', (x = round( args[argi++] )) + ',' +
                          (y = round( args[argi++] )) );
          }
          break;
        case "l": // lineTo (relative)
          op = '';
          while ( argi < args.length ) {
            np.push( 'l', (x = x + round( args[argi++] )) + ',' +
                          (y = y + round( args[argi++] )) );
          }
          break;

        case "H": // horizontal lineto (absolute)
          op = 'l';
          args = [ (x = round( args[0] )), y ];
          break;
        case "h": // horizontal lineto (relative)
          op = 'l';
          args = [ (x = x + round( args[0] )), y ];
          break;

        case "V": // vertical lineto (absolute)
          op = 'l';
          args = [ x, (y = round( args[0] )) ];
          break;
        case "v": // vertical lineto (relative)
          op = 'l';
          args = [ x, (y = y + round( args[0] )) ];
          break;

        case "C": // curveto (absolute)
          op = 'c';
          lastcurve = args = [
            round(args[0]), round(args[1]),
            round(args[2]), round(args[3]),
            (x = round( args[4] )),
            (y = round( args[5] ))
          ];
          break;
        case "c": // curveto (relative)
          op = 'c';
          lastcurve = args = [
            x + round(args[0]),
            y + round(args[1]),
            x + round(args[2]),
            y + round(args[3]),
            (x = x + round( args[4] )),
            (y = y + round( args[5] ))
          ];
          break;

        case "S": // shorthand/smooth curveto (absolute)
          op = 'c';
          lastcurve = args = [
            lastcurve[4] + (lastcurve[4] - lastcurve[2]),
            lastcurve[5] + (lastcurve[5] - lastcurve[3]),
            round(args[0]),
            round(args[1]),
            (x = round( args[2] )),
            (y = round( args[3] ))
          ];
          break;
        case "s":  // shorthand/smooth curveto (relative)
          op = 'c';
          lastcurve = args = [
            lastcurve[4] + (lastcurve[4] - lastcurve[2]),
            lastcurve[5] + (lastcurve[5] - lastcurve[3]),
            x + round(args[0]),
            y + round(args[1]),
            (x = x + round( args[2] )),
            (y = y + round( args[3] ))
          ];
          break;

        case "Q": // quadratic Bézier curveto (absolute)
          op = 'c';
          var x1 = round( args[0] ),
              y1 = round( args[1] ),
              x2 = round( args[2] ),
              y2 = round( args[3] );
          args = [
            ~~(x + (x1 - x) * 2 / 3),
            ~~(y + (y1 - y) * 2 / 3),
            ~~(x1 + (x2 - x1) / 3),
            ~~(y1 + (y2 - y1) / 3),
            (x = x2),
            (y = y2)
          ];
          break;
        case "q": // TODO: quadratic Bézier (relative)
          op = 'l';
          x += round( args[2] );
          y += round( args[3] );
          args = [ x, y ];
          break;

        // TODO: T/t (Shorthand/smooth quadratic Bézier curveto)

        case "Z":
        case "z":
          op = 'xe';
          args = [];
          break;

        default:
          // unsupported path command
          op = '';
          args = [];
      }
      if ( op ) {
        np.push( op, args.join(',') );
      }
    }
    return ( vml._pathcache[p] = (np.join('') + 'e') );
  }