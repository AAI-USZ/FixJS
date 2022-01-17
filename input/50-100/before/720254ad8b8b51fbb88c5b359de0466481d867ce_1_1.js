function(model) {

  model.setNull(docPath, { // create the empty, static doc
    entities: []
  });

  // useful for debugging; disable in production
  window.model = model;
  
  // export controllers that the client side code will use
  // (putting them under the global `window` makes it s.t. we don't need to
  // require() them in the client side code -- nifty :)
  window.doc = ( require("./doc") )( model );

  // execute the client side code
  var useQunit = model.get('_useQunit');
  if( !useQunit ){
    ( require("./client") )( model );
  }
}