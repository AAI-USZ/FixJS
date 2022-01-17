function(slug) {
    var item, url, x, ___iced_passed_deferral, __iced_deferrals, _i, _len,
      _this = this;
    ___iced_passed_deferral = iced.findDeferral(arguments);
    $('fb\\:comments').remove();
    $('fb\\:like').remove();
    if (slug) {
      $("#summary-header").css('visibility', 'hidden');
      $("#summary").html('');
      $("#orderstats").css('display', 'none');
      $("#sort button").addClass('disabled');
      $("#searchbox").addClass('disabled');
      $("#searchbox").attr('disabled', 'disabled');
      $("#clearsearch").addClass('disabled');
      $("#clearsearch").attr('disabled', 'disabled');
      for (_i = 0, _len = loaded_data.length; _i < _len; _i++) {
        x = loaded_data[_i];
        if (x.slug === slug) {
          item = run_templates("single-item", x, "#single-item");
          set_title(x.base.book + ": " + x.base.subject);
          url = generate_url(slug);
          $(".detail-view .fb").append("<fb:like href='" + url + "' send='true' width='700' show_faces='true' action='recommend' font='tahoma'></fb:like>");
          $(".detail-view .fb").append("<fb:comments href='" + url + "' num_posts='2' width='700'></fb:comments>");
          if (window.FB) {
            FB.XFBML.parse(item.get(0), function() {});
            window.updateFB = function() {};
          } else {
            window.updateFB = function() {
              return FB.XFBML.parse(item.get(0), function() {});
            };
          }
          break;
        }
      }
      (function(__iced_k) {
        __iced_deferrals = new iced.Deferrals(__iced_k, {
          parent: ___iced_passed_deferral,
          filename: 'gov-watch.iced',
          funcname: 'select_item'
        });
        setTimeout((__iced_deferrals.defer({
          assign_fn: (function() {
            return function() {
              return __iced_deferrals.ret = arguments[0];
            };
          })(),
          lineno: 800
        })), 50);
        __iced_deferrals._fulfill();
      })(function() {
        setup_timeline('.detail-view', 69);
        setup_subscriptions(".detail-view");
        setup_tags(".detail-view .tags > ul > li");
        setup_tooltips(".detail-view");
        load_fb_comment_count(".detail-view");
        return __iced_k($('html, body').animate({
          scrollTop: 0
        }, 0));
      });
    } else {
      $("#single-item").html('');
      $("#summary-header").css('visibility', 'inherit');
      $("#orderstats").css('display', 'inherit');
      $("#sort button").removeClass('disabled');
      $("#searchbox").removeClass('disabled');
      $("#searchbox").attr('disabled', null);
      $("#clearsearch").removeClass('disabled');
      return __iced_k($("#clearsearch").attr('disabled', null));
    }
  }