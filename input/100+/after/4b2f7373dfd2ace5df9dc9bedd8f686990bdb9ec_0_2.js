function ( attr, style, elm ) {
        var d = vml.get_dim( attr ),
            es = elm.style;
        es.left = (d.translate_x + d.x) + "px";
        es.top = (d.translate_y + d.y) + "px";
        elm.coordorigin = "0,0";
        elm.coordsize = "21600,21600";
        vml.path( elm, attr.d );
        vml.fill( elm, attr );
        vml.stroke( elm, attr );
        if ( d.rotation ) {
          var r = (~~d.rotation % 360) * vml.d2r,
              ct = Math.cos(r),
              st = Math.sin(r);
          vml.skew( elm, [
            ct.toFixed( 8 ), -st.toFixed( 8 ),
            st.toFixed( 8 ),  ct.toFixed( 8 ),
            0, 0
          ].join(','));
        }
        else {
          vml.skew( elm, "" );
        }
      }