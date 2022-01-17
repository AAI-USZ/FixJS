function( butter ){
        m1 = butter.addMedia( { url:"www.test-url-1.com", target:"test-target-1" } );
        m2 = butter.addMedia( { url:"www.test-url-2.com", target:"test-target-2" } );
        t1 = m1.addTrack();
        t2 = m1.addTrack();
        butter.currentMedia = m2;
        t3 = m2.addTrack();
        t4 = m2.addTrack();
        te1 = t4.addTrackEvent( { popcornOptions: { start: 2, end: 6 }, type: "test" } );
        butter.addTarget( { name: "beep" } );
        exported = butter.exportProject();

        Butter({
          config: "test-config.json",
          ready: function( secondButter ){
            teEvents = tEvents = mEvents = 0;
            secondButter.listen( "mediaadded", function(){
              mEvents++;
            });
            secondButter.listen( "trackadded", function(){
              tEvents++;
            });
            secondButter.listen( "trackeventadded", function(){
              teEvents++;
            });

            secondButter.importProject( exported );
            allMedia = secondButter.media;

            ok( allMedia.length === 2, "right number of media objects" );
            ok( allMedia[ 0 ].url === "www.test-url-1.com", "media 1 url is correct" );
            ok( allMedia[ 0 ].target === "test-target-1", "media 1 target is correct" );
            ok( allMedia[ 1 ].url === "www.test-url-2.com", "media 2 url is correct" );
            ok( allMedia[ 1 ].target === "test-target-2", "media 2 target is correct" );

            ok( allMedia[ 0 ].tracks.length === 2, "media 1 has right number of tracks" );
            ok( allMedia[ 1 ].tracks.length === 2, "media 2 has right number of tracks" );
            ok( allMedia[ 1 ].tracks[ 1 ].trackEvents[ 0 ].popcornOptions.end === 6, "trackevent is correct" );

            ok( butter.targets[ 0 ].name === "beep", "target is correct" );

            ok( teEvents === 1, "one trackeventadded events" );
            ok( tEvents === 4, "four trackadded events" );
            ok( mEvents === 2, "two mediaadded events" );

            start();
          }
        });
      }