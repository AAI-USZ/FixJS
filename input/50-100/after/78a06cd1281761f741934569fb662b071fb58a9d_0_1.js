function(e) {
    e.preventDefault();
    var time = new Date();
    var hh = (time.getHours() < 10)? "0" + time.getHours() : time.getHours()
    var mm = (time.getMinutes() < 10)? "0" + time.getMinutes() : time.getMinutes()
    $(this).parent().find('input[type=text]').val(hh + ':' + mm)
  }