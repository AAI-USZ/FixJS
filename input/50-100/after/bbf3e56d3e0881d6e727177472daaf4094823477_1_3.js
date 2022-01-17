function(e) {
  if (e.which === 13) {
    var newName = $('h1 input.name').val();
    updateObjectAttributes({'name': newName}, function() {
      window.location.href = window.location.pathname;
    });
  }
}