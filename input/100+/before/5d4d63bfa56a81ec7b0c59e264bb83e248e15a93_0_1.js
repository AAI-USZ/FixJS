function(){ 
  		    if ($('.closeMe').hasClass('on')) {
            $('.closeMe').removeClass('on');
            $('#maindiv #outer .roomView #right-panel .info-container').show();
            $('.settings, .activityLog, .guestList, .recentSongs, .myQueue').show();
            $('.playlist-container, li.myQueue').addClass('active'); 
                    window.resizeTimer = setTimeout(function(a,b) {
          if (a.height()==$(window).height()&&a.width()==$(window).width()) {
            b.resize();
          }
        }, 50, $(window), $this)
          } else {
            $('.closeMe').addClass('on');
            $('#maindiv #outer .roomView #right-panel .info-container').hide();
            $('.settings, .activityLog, .guestList, .recentSongs, .myQueue').hide();
            $(this).siblings().removeClass('active'); 
            $('.panel.active').removeClass('active');
                    window.resizeTimer = setTimeout(function(a,b) {
          if (a.height()==$(window).height()&&a.width()==$(window).width()) {
            b.resize();
          }
        }, 50, $(window), $this)
          };
  		  }