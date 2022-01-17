function() {
  var stack = View.getMain().getStack();
  if (stack.getLength() > 1 || stack.getByURL('/preset')) return;

  View.getMain().push('preset', new View.Object({
    url: '/preset',
    title: 'Presets'
  }).invalidate());
}