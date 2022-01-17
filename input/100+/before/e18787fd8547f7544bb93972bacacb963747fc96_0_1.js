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
}