function( require, exports, module ){

  //Use the global requirejs to create a new context.
  var ctx = requirejs.config({
    context: "butter",
    baseUrl: module.uri.substring(0, module.uri.lastIndexOf('/')),
    // Paths are relative to the baseUrl
    paths: {
      'text': '../external/require/text'
    }
  });

  ctx( [ "../include/editors", "main" ] );
}