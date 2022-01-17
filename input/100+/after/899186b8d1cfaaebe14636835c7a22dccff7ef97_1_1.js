function() {
  var p = Popcorn( "#video" );

  Popcorn.plugin( "destroyable", {
    start: function() {},
    end: function() {}
  });

  p.cue( 1, Popcorn.nop );

  p.destroyable({
    start: 1,
    end: 2,
    text: "hi"
  });

  p.destroy();

  equal( p.data.trackEvents.byStart.length, 0, "Zero trackEvents.byStart after destroy" );

  equal( p.data.trackEvents.byEnd.length, 0, "Zero trackEvents.byEnd after destroy" );

  Popcorn.removePlugin( "destroyable" );
}