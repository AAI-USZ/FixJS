function(e) {
    e.preventDefault();
    var $input = $(this).parent().find('input[type=text]');
    var time = new Date();
    $input.val(time.getHours() + ':' + time.getMinutes())
  }