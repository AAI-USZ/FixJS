function() {
        $(this).css({"background-image": "url('/images/logo_lettering.png')", "width": "190px"})
          .animate({"opacity": "1"}, {queue: false, duration: 500})
          .animate({"padding-bottom": "13px", "height": "33px"}, {duration: 500});
        $(this).css({"background-position": "0 12px"});
      }