function() {
        setup_timeline($('.detail-view'), 69);
        setup_subscriptions($(".detail-view"));
        setup_tags(".detail-view .tags > ul > li");
        setup_tooltips($(".detail-view"));
        $("#single-item .commentcount").click(function() {
          $('html, body').animate({
            scrollTop: $("#single-item .fb").offset().top
          }, 0);
          return false;
        });
        $("#single-item .linkcount").click(function() {
          $('html, body').animate({
            scrollTop: $("#single-item .timeline").offset().top
          }, 0);
          return false;
        });
        if (go_to_comments) {
          scroll_to = $(".fb").offset().top - 300;
        } else {
          scroll_to = 0;
        }
        go_to_comments = false;
        return __iced_k($('html, body').animate({
          scrollTop: scroll_to
        }, 0));
      }