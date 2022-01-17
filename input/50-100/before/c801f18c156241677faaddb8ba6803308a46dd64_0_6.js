function() {
        setup_timeline('.detail-view', 69);
        setup_subscriptions(".detail-view");
        setup_tags(".detail-view .tags > ul > li");
        setup_tooltips(".detail-view");
        load_fb_comment_count(".detail-view");
        return __iced_k($('html, body').animate({
          scrollTop: 0
        }, 0));
      }