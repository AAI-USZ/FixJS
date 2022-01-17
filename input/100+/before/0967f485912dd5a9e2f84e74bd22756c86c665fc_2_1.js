function(index){
      var color1 = $(this).attr('color1');
      var color2 = $(this).attr('color2');
      $(this).find(".user_color").css('background-image', 'linear-gradient(bottom, ' + color1 + ' 27%, ' + color2 + ' 64%)');
      $(this).find(".user_color").css('background-image', '-o-linear-gradient(bottom, ' + color1 + ' 27%, ' + color2 + ' 64%)');
      $(this).find(".user_color").css('background-image', '-moz-linear-gradient(bottom, ' + color1 + ' 27%, ' + color2 + ' 64%)');
      $(this).find(".user_color").css('background-image', '-webkit-linear-gradient(bottom, ' + color1 + ' 27%, ' + color2 + ' 64%)');
      $(this).find(".user_color").css('background-image', '-ms-linear-gradient(bottom, ' + color1 + ' 27%, ' + color2 + ' 64%)');
      $(this).find(".user_color").css('background-image', '-webkit-gradient( linear, left bottom, left top, color-stop(0.27, ' + color1 + '), color-stop(0.64, ' + color2 + '));');
  }