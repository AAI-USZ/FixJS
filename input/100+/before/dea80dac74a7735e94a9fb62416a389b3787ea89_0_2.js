function(){
      $("#header-logo").stop().animate({opacity: 0},400,function(){
        $(this).css({"background-image": "url('/logo.png')", 
                     "background-repeat": "no-repeat", 
                     "width": "130px",
                     "margin-top": "0"})
               .animate({height: '92px'},{duration:1000})
               .animate({opacity: 1},{duration:1000});
      });
      $("#slogan").fadeIn(600);

      header_logo.from    = "logo";
      header_logo.to      = "lettering";
      header_logo.current = "logo";
    }