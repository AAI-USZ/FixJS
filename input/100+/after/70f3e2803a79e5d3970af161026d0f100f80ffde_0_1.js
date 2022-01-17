function() {

  var $pop = Popcorn( "#video" ),
      attr = "controls",
      initialValue = $pop[ attr ](),
      expectedData = {
        attribute: attr,
        previousValue: initialValue,
        currentValue: !initialValue
      };

  $pop.on( "attrchange", function( data ) {

    deepEqual( data, expectedData, "attrchange reports the correct expected data" );
    start();
  });

  // The first attr call shouldn't emit attrchange, only the second one should
  $pop[ attr ]( initialValue );
  $pop[ attr ]( !initialValue );
  // because we change the state of controls for this test
  // we need to make sure we set it back to its initial value before continueing
  $pop.off( "attrchange" );
  $pop[ attr ]( initialValue );
}