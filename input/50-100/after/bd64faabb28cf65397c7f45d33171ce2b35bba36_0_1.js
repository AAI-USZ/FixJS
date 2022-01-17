function toggleCmnts() {
  var a = document.getElementsByClassName('cmnt');
  if (a.length == 0)
    return;
  var s = a[0].style.display !== 'block' ? 'block' : 'none';
  for (var i = 0; i < a.length; i++)
    a[i].style.display = s;
}