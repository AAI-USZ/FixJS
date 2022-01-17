function serializeParams ( params ) {
  var kv = [];
  $.each( params, function( key, val ){
    kv.push( key + '=' + val );
  });
  return kv.join('&');
}