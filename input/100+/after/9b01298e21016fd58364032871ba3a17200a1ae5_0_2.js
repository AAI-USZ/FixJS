function jsLoadCallback(){
          // Assume *.less is beside *.css file
          var less = window.less,
              lessURL = url.replace( /\.css$/, ".less" ),
              lessFile;

          // Load the .less file, parse with LESS, and inject CSS <style>
          XHR.get( lessURL, function xhrCallback(){
            if ( this.readyState === 4) {
              var parser = new less.Parser();
              lessFile = this.response;

              parser.parse( lessFile, function( e, root ){
                if( e ){
                  // Problem parsing less file
                  err( "Butter: Error parsing LESS file [" + lessURL + "]", e.message );
                  return;
                }

                var css, styles;
                css = document.createElement( "style" ),
                css.type = "text/css";
                document.head.appendChild( css );
                styles = document.createTextNode( root.toCSS() );
                css.appendChild( styles );
              });
            }
          });
        }