function(){
      $("#header-logo").stop().animate({opacity: 0},400,function()
      {
        $(this).css({"background-image": "url('/logo.png')", "background-position-y": "0", "padding-bottom": "0", "width": "130px"})
          .animate({"height": "92px"}, {duration: 300})
          .animate({"opacity": "1"}, {duration: 300});
      });
      $("#slogan").delay(500).fadeIn(300);

      header_logo.from = "logo";
      header_logo.to   = "lettering";
      header_logo.current = "logo";
    }