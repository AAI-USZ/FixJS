function(input, owner, name, source) {
  input.val(owner[name]);
  
  Bloom.watch_input(input, function() {
    owner.value(name, input.val(), source);
  });
  
  source.listen(owner, 'change.' + name, function(value) {
    input.val(value);
  });
  
//  input.focus(function() {
//    input.select();
//  });
}