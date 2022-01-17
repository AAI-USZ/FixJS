function cpaCallback() {
    popped.off( "canplayall", cpaCallback );

    popped.on( "seeked", function seekedCallback() {
      popped.pause();
      popped.off( "seeked" );

      Popcorn.plugin( "testPlugin", {});

      Popcorn.compose( "testCompose1", {
        start: function() {
          test.one.running++;
        },
        end: function() {
          test.one.running--;
        },
        _setup: function() {
          test.one.setup++;
        },
        _teardown: function() {
          test.one.setup--;
        }
      });

      Popcorn.effect( "testEffect2", {
        start: function() {
          test.two.running++;
        },
        end: function() {
          test.two.running--;
        },
        _setup: function() {
          test.two.setup++;
        },
        _teardown: function() {
          test.two.setup--;
        }
      });

      popped.testPlugin({
        start: 0,
        end: 1,
        compose: "testCompose1",
        effect: "testEffect2"
      });

      effectTrackOne = popped.getLastTrackEventId();

      popped.testPlugin({
        start: 1,
        end: 2
      })
      .testPlugin({
        start: 2,
        end: 4,
        compose: "testCompose1"
      })
      .testPlugin({
        start: 3,
        end: 4,
        compose: "testCompose1 testEffect2"
      });

      effectTrackTwo = popped.getLastTrackEventId();

      popped.testPlugin({
        start: 5,
        end: 6,
        effect: "testCompose1"
      })
      .testPlugin({
        start: 6,
        end: 7,
        effect: "testCompose1 testEffect2"
      });

      effectTrackThree = popped.getLastTrackEventId();

      equal( test.one.running, 0, "no compose one running" );
      plus();
      equal( test.one.setup, 5, "five compose one setup" );
      plus();
      equal( test.two.running, 0, "no compose two running" );
      plus();
      equal( test.two.setup, 3, "three compose two setup" );
      plus();

      popped.cue( 0, function() {
        equal( test.one.running, 1, "one compose running" );
        plus();
        equal( test.two.running, 1, "one effect running" );
        plus();
      })
      .cue( 1, function() {
        equal( test.one.running, 0, "no compose running" );
        plus();
        equal( test.two.running, 0, "no effect running" );
        plus();
      })
      .cue( 2, function() {
        equal( test.one.running, 1, "one compose running" );
        plus();
        equal( test.two.running, 0, "no effect running" );
        plus();
      })
      .cue( 3, function() {
        equal( test.one.running, 2, "two compose one running" );
        plus();
        equal( test.two.running, 1, "one compose two running" );
        plus();
      })
      .cue( 4, function() {
        equal( test.one.running, 0, "no compose one running" );
        plus();
        equal( test.two.running, 0, "no compose two running" );
        plus();
      })
      .cue( 5, function() {
        equal( test.one.running, 1, "one effect running" );
        plus();
        equal( test.two.running, 0, "no compose running" );
        plus();
      })
      .cue( 6, function() {
        equal( test.one.running, 1, "one effect one running" );
        plus();
        equal( test.two.running, 1, "one effect two running" );
        plus();
      })
      .cue( 7, function() {
        popped.removeTrackEvent( effectTrackOne );
        popped.removeTrackEvent( effectTrackTwo );
        popped.removeTrackEvent( effectTrackThree );
        popped.removeTrackEvent( composeOptionsOne );
        popped.removeTrackEvent( composeOptionsTwo );
        equal( test.one.setup, 2, "three compose one teardowns called. 5 - 3 = 2" );
        plus();
        equal( test.two.setup, 0, "three compose two teardowns called. 3 - 3 = 0" );
        plus();
      });

      // runs once, 2 tests
      Popcorn.plugin( "pluginOptions1", {
        _setup: function( options ) {
          ok( options.pluginoption, "plugin option one exists at setup" );
          plus();
          ok( !options.composeoption, "compose option one does not exist at setup" );
          plus();
          // check to test plugin to effect call order
          options.composeoption = true;
        }
      });

      // runs once, 2 tests
      Popcorn.plugin( "pluginOptions2", {
        _setup: function( options ) {
          ok( !options.pluginoption, "plugin option two does not exist at setup" );
          plus();
          ok( options.composeoption, "compose option two exists at setup" );
          plus();
          // check to test plugin to effect call order
          options.pluginoption = true;
        }
      });

      // runs twice, 8 tests * 2 runs = 16 tests
      Popcorn.plugin.effect( "composeOptions", {
        _setup: function( options ) {
          ok( options.pluginoption, "plugin option exists at setup" );
          plus();
          ok( options.composeoption, "compose option exists at setup" );
          plus();
        },
        _teardown: function( options ) {
          ok( options.pluginoption, "plugin option exists at teardown" );
          plus();
          ok( options.composeoption, "compose option exists at teardown" );
          plus();
        },
        start: function( event, options ) {
          ok( options.pluginoption, "plugin option exists at start" );
          plus();
          ok( options.composeoption, "compose option exists at start" );
          plus();
        },
        end: function( event, options ) {
          ok( options.pluginoption, "plugin option exists at end" );
          plus();
          ok( options.composeoption, "compose option exists at end" );
          plus();
        }
      });

      popped.pluginOptions1({
        start: 0,
        end: 1,
        compose: "composeOptions",
        pluginoption: true
      });

      composeOptionsOne = popped.getLastTrackEventId();

      popped.pluginOptions2({
        start: 0,
        end: 1,
        compose: "composeOptions",
        composeoption: true
      });

      composeOptionsTwo = popped.getLastTrackEventId();

      popped.play( 0 );
    });
    popped.currentTime( popped.duration() - 1 );
  }