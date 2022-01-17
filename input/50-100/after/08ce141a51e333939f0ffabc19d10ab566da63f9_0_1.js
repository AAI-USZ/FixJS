function compileHandler() {
    var worked = false;
    console.log('compile');

    try {
      worked = $.hakadoo.validate(questionIndex, you.getValue());
      $('#console').prepend('<li class="positive">Congratulations! You win!</li>');
    } catch(e) {
      worked = false;
      $('#console').prepend('<li>' + e.name + ': ' + e.message + '</li>');
    }
    socket.emit('compile', {
      worked: worked
    });
  }