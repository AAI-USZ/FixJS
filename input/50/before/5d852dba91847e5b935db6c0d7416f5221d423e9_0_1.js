function(term) {
  var a = term.match(/park/) ? '' : 'a ';
  return a+term.replace(/s$/,'');
}