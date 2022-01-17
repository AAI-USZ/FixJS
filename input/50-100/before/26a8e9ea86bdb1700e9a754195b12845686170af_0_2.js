function()
      {
        $(this).css({"background-image": "url('/logo.png')", "background-position-y": "0", "padding-bottom": "0", "width": "130px"})
          .animate({"height": "92px"}, {duration: 300})
          .animate({"opacity": "1"}, {duration: 300});
      }