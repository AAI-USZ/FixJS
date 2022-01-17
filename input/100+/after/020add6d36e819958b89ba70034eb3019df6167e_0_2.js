function( res ) {
              ok(res, "The project list response has data" );
              equal( res.error, "okay", "Project list status is \"okay\"" );
              ok( res.projects, "There is a list of projects" );

              for( i = 0, len = res.projects.length; i < len; i++ ){
                if( res.projects[ i ].name === filename ){
                  foundProject = true;
                  break;
                }
              }

              equal( false, foundProject, filename + " is not present in the projects list" );

              butter.cornfield.load( filename, function( res ) {
                deepEqual( res, { error: "project not found" }, "The project load response is project not found" );

                butter.cornfield.save( filename, stringedData, function( res ) {
                  equal( res.error, "okay", "The project save response is okay" );

                  filename = res.project._id;

                  butter.cornfield.load( filename, function( res ) {
                    deepEqual( JSON.parse( res.project ), data.data, "The project is the same" );

                    start();
                  });
                });
              });
            }