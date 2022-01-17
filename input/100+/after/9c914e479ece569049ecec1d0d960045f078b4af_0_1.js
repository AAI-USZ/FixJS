function() {
    var c1, c1_str, c2, c2_str, c3, c4, c5, c6;
    c1 = randcolor1();
    c1_str = convert_list_to_hsl(c1);
    $("#color1").css("background-color", c1_str);
    $("#color1").click(function() {
      return $(this).html(c1_str);
    });
    c2 = randcolor2(c1);
    c2_str = convert_list_to_hsl(c2);
    $("#color2").css("background-color", c2_str);
    $("#color2").click(function() {
      return $(this).html(c2_str);
    });
    c3 = randcolor3();
    $("#color3").css("background-color", c3);
    $("#color3").click(function() {
      return $(this).html(c3);
    });
    c4 = randcolor4();
    $("#color4").css("background-color", c4);
    $("#color4").click(function() {
      return $(this).html(c4);
    });
    c5 = randcolor5();
    $("#color5").css("background-color", c5);
    $("#color5").click(function() {
      return $(this).html(c5);
    });
    c6 = randcolor6();
    $("#color6").css("background-color", c6);
    return $("#color6").click(function() {
      return $(this).html(c6);
    });
  }