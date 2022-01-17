function() {
        setup_timeline(".item");
        $(".item").css('visibility', 'inherit');
        setup_searchbox();
        setup_subscription_form();
        setup_subscriptions(".item");
        setup_tags(".item .tags > ul > li, a[data-tag='true']");
        setup_detailed_links();
        setup_tooltips(".item");
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
          'show': true
        });
        window.onhashchange = onhashchange;
        onhashchange();
        (function(__iced_k) {
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
            lineno: 771
          })), 1000);
          __iced_deferrals._fulfill();
        })(function() {
          return load_fb_comment_count(".item");
        });
      }