function() {
        setup_subscription_form();
        setup_searchbox();
        setup_tags(".item .tags > ul > li, a[data-tag='true'], .searchtag > span");
        setup_detailed_links();
        $(".item").one('inview', function() {
          setup_timeline($(this));
          $(this).css('visibility', 'inherit');
          setup_subscriptions($(this));
          return setup_tooltips($(this));
        });
        load_fb_comment_count($(".item"));
        $("#books li.book a").click(function() {
          selected_book = $(this).html();
          update_history();
          return false;
        });
        $("#sort button").click(function() {
          var sort_measure;
          $("#sort button").removeClass('active');
          $(this).addClass('active');
          sort_measure = $(this).attr('value');
          $("#items").isotope('updateSortData', $(".isotope-card"));
          $("#items").isotope({
            sortBy: sort_measure
          });
          return false;
        });
        $("#explanation").modal({
          'show': explanation_needed
        });
        window.onhashchange = onhashchange;
        onhashchange();
        __iced_deferrals = new iced.Deferrals(__iced_k, {
          parent: ___iced_passed_deferral,
          filename: 'gov-watch.iced',
          funcname: 'process_data'
        });
        setTimeout((__iced_deferrals.defer({
          assign_fn: (function() {
            return function() {
              return __iced_deferrals.ret = arguments[0];
            };
          })(),
          lineno: 846
        })), 1000);
        __iced_deferrals._fulfill();
      }