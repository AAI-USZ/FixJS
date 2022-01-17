function(e) {
  if (e.which === 13) {
    var newName = $('h1 input.name').attr('value');
    updateObjectAttributes({'name': newName});
    return false;
  }
}