function() {
  var convert_list_to_hsl, randcolor1, randcolor2, randcolor3, randcolor4, randcolor5, randcolor6, randh1, randh3, randh4, randh5, randh6, randl1, randl3, randl4, randl5, randl6, rands1, rands3, rands4, rands5, rands6;

  $(function() {
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
  });

  convert_list_to_hsl = function(hsl_list) {
    return 'hsl(' + hsl_list[0] + "," + hsl_list[1] + "%," + hsl_list[2] + '%)';
  };

  randh1 = function() {
    return Math.floor(Math.random() * 360);
  };

  rands1 = function() {
    return Math.floor(Math.random() * (60 - 40 + 1) + 40);
  };

  randl1 = function() {
    return Math.floor(Math.random() * (60 - 40 + 1) + 40);
  };

  randcolor1 = function() {
    return [randh1(), rands1(), randl1()];
  };

  randcolor2 = function(c) {
    return [c[0] + 180, c[1], c[2]];
  };

  randh3 = function() {
    return Math.round(Math.random() * 360);
  };

  rands3 = function() {
    return Math.round(Math.random() * 100);
  };

  randl3 = function() {
    return Math.round(Math.random() * 100);
  };

  randcolor3 = function() {
    return 'hsl(' + randh3() + "," + rands3() + "%," + randl3() + '%)';
  };

  randh4 = function() {
    return Math.round(Math.random() * 360);
  };

  rands4 = function() {
    return Math.round(Math.random() * 100);
  };

  randl4 = function() {
    return Math.round(Math.random() * 100);
  };

  randcolor4 = function() {
    return 'hsl(' + randh4() + "," + rands4() + "%," + randl4() + '%)';
  };

  randh5 = function() {
    return Math.round(Math.random() * 360);
  };

  rands5 = function() {
    return Math.round(Math.random() * 100);
  };

  randl5 = function() {
    return Math.round(Math.random() * 100);
  };

  randcolor5 = function() {
    return 'hsl(' + randh5() + "," + rands5() + "%," + randl5() + '%)';
  };

  randh6 = function() {
    return Math.round(Math.random() * 360);
  };

  rands6 = function() {
    return Math.round(Math.random() * 100);
  };

  randl6 = function() {
    return Math.round(Math.random() * 100);
  };

  randcolor6 = function() {
    return 'hsl(' + randh6() + "," + rands6() + "%," + randl6() + '%)';
  };

}