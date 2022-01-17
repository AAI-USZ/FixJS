function() {
  var stack = View.getMain().getStack();
  if (stack.getLength() > 1 || stack.getByURL('/production')) return;

  View.getMain().push('production', new View.Object({
    url: '/production',
    title: 'Productions'
  }).invalidate());
}