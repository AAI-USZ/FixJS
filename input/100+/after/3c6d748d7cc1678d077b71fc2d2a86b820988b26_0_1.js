function( err, data ){

          if ( err ) {
            res.json( { error: 'error reading template file' }, 500 );
            return;
          }

          var headEndTagIndex,
              bodyEndTagIndex,
              externalAssetsString = '',
              popcornString = '',
              currentMedia,
              currentTrack,
              currentTrackEvent,
              mediaPopcornOptions,
              templateURL,
              baseString,
              headStartTagIndex,
              templateScripts,
              startString,
              j, k;

          templateURL = templateFile.substring( templateFile.indexOf( '/templates' ), templateFile.lastIndexOf( '/' ) );
          baseString = '\n  <base href="' + PUBLISH_PREFIX + templateURL + '/"/>';

          // look for script tags with data-butter-exclude in particular (e.g. butter's js script)
          data = data.replace( /\s*<script[\.\/='":_-\w\s]*data-butter-exclude[\.\/='":_-\w\s]*><\/script>/g, '' );

          // Adding 6 to cut out the actual head tag
          headStartTagIndex = data.indexOf( '<head>' ) + 6;
          headEndTagIndex = data.indexOf( '</head>' );
          bodyEndTagIndex = data.indexOf( '</body>' );

          templateScripts = data.substring( headStartTagIndex, headEndTagIndex );
          startString = data.substring( 0, headStartTagIndex );

          for ( i = 0; i < EXPORT_ASSETS.length; ++i ) {
            externalAssetsString += '\n  <script src="' + path.relative( templateFile, path.resolve( EXPORT_ASSETS[ i ] ) ) + '"></script>\n';
          }

          // If the template has custom plugins defined in it's config, add them to our exported page
          if ( templateConfig.plugin && templateConfig.plugin.plugins ) {
            var plugins = templateConfig.plugin.plugins;

            for ( i = 0, len = plugins.length; i < len; i++ ) {
              externalAssetsString += '\n  <script src="' + PUBLISH_PREFIX + '/' + plugins[ i ].path.split( '{{baseDir}}' ).pop() + '"></script>';
            }
            externalAssetsString += '\n';
          }

          popcornString += '<script>';

          for ( i = 0; i < projectData.media.length; ++i ) {
            var mediaUrls,
                mediaUrlsString = '[ "';

            currentMedia = projectData.media[ i ];
            // We expect a string (one url) or an array of url strings.
            // Turn a single url into an array of 1 string.
            mediaUrls = typeof currentMedia.url === "string" ? [ currentMedia.url ] : currentMedia.url;
            mediaPopcornOptions = currentMedia.popcornOptions || {};
            numSources = mediaUrls.length;

            for ( k = 0; k < numSources - 1; k++ ) {
              mediaUrlsString += mediaUrls[ k ] + '" , "';
            }
            mediaUrlsString += mediaUrls[ numSources - 1 ] + '" ]';

            popcornString += '\n(function(){';
            popcornString += '\nvar popcorn = Popcorn.smart("#' + currentMedia.target + '", ' +
                             mediaUrlsString + ', ' + JSON.stringify( mediaPopcornOptions ) + ');';
            for ( j = 0; j < currentMedia.tracks.length; ++ j ) {
              currentTrack = currentMedia.tracks[ j ];
              for ( k = 0; k < currentTrack.trackEvents.length; ++k ) {
                currentTrackEvent = currentTrack.trackEvents[ k ];
                popcornString += '\npopcorn.' + currentTrackEvent.type + '(';
                popcornString += JSON.stringify( currentTrackEvent.popcornOptions, null, 2 );
                popcornString += ');';
              }
            }
            if ( currentMedia.controls ) {
              popcornString += "\npopcorn.controls( true );\n";
            }
            popcornString += '}());\n';
          }
          popcornString += '</script>\n';

          customDataString = '\n<script type="application/butter-custom-data">\n' + customData + '\n</script>';

          data = startString + baseString + templateScripts + externalAssetsString + data.substring( headEndTagIndex, bodyEndTagIndex ) + customDataString + popcornString + data.substring( bodyEndTagIndex );

          fs.writeFile( projectPath, data, function(){
            if( err ){
              res.json({ error: 'internal file error' }, 500);
              return;
            }
            res.json({ error: 'okay', url: url });
          });
        }