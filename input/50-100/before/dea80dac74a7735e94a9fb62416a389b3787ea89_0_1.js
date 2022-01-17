function(){
        $(this).css({"background-image": "url('/images/logo_lettering.png')", 
                     "background-repeat": "no-repeat", 
                     "width": "190px", 
                     "margin-top": "10px"})
               .animate({opacity: 1, height: '33px'},{queue:false,duration:1000});
      }