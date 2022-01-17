function(e) {
  bundle.prepend('\nthrow new Error('+JSON.stringify(e.message)+');');
}