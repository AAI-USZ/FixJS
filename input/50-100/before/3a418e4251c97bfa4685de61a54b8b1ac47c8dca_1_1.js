function(){

  var dialogs = [
    "error-message",
    "track-data",
    "delete-track",
    "export",
    "quit-confirmation",
    "save-as",
    "load",
    "share"
  ];

  var include = [];
  var i = dialogs.length;
  while ( i-- ) {
    include.push( "dialog/dialogs/" + dialogs[ i ] );
  }

  define( include, function() {} );

}