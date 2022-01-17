function(){
        $(this).css({"background-image": "url('/logo.png')", 
                     "background-repeat": "no-repeat", 
                     "width": "130px",
                     "margin-top": "0"})
               .animate({height: '92px'},{duration:1000})
               .animate({opacity: 1},{duration:1000});
      }