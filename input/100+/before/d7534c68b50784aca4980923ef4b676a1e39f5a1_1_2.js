function() {
        if ( xhr.readyState === 4 ) {
          var allTests = JSON.parse( xhr.responseText ),
              testGroup,
              testLinks = id( "test-links" ),
              anchor,
              anchorText,
              testName;

          for ( x in allTests ) {
            testGroup = allTests[ x ];
            for ( f in testGroup ) {
              testName = f.charAt( 0 ).toUpperCase() + f.slice( 1 );
              testList.push({
                "name": testName,
                "path": "../" + testGroup[ f ],
                "type": testGroup
              });

              anchor = document.createElement( "a" );
              anchor.target = "_blank";
              anchor.href = "../" + testGroup[ f ];
              anchorText = document.createTextNode( testName );
              anchor.appendChild( anchorText );
              testLinks.appendChild( anchor );
            }
          }
          if ( loadedCallback && typeof loadedCallback === "function" ) {
            loadedCallback();
          }
        }
      }