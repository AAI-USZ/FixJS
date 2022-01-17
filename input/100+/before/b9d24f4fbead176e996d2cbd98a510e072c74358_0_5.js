function() {
      $.Isotope.prototype._positionAbs = function(x, y) {
        return {
          right: x,
          top: y
        };
      };
      $("#items").isotope({
        itemSelector: '.isotope-card',
        layoutMode: 'masonry',
        transformsEnabled: false,
        filter: ".shown",
        animationEngine: "css",
        getSortData: {
          followers: function(e) {
            return -parseInt("0" + e.find('.watch').text());
          },
          original: function(e) {
            return "" + (e.attr('data-chapter')) + "/" + (e.attr('data-subchapter')) + "/" + (e.attr('rel'));
          },
          budget: function(e) {
            return -parseInt("0" + e.attr('cost'), 10);
          },
          comments: function(e) {
            var ret;
            ret = -parseInt("0" + e.find('.commentcount').text(), 10);
            return ret;
          }
        }
      });
      (function(__iced_k) {
        __iced_deferrals = new iced.Deferrals(__iced_k, {
          parent: ___iced_passed_deferral,
          filename: "gov-watch.iced",
          funcname: "process_data"
        });
        setTimeout((__iced_deferrals.defer({
          assign_fn: (function() {
            return function() {
              return __iced_deferrals.ret = arguments[0];
            };
          })(),
          lineno: 806
        })), 50);
        __iced_deferrals._fulfill();
      })(function() {
        setup_timeline(".item");
        $(".item").css('visibility', 'inherit');
        setup_searchbox();
        setup_subscription_form();
        setup_subscriptions(".item");
        setup_tags(".item .tags > ul > li, a[data-tag='true'], .searchtag > span");
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
          'show': explanation_needed
        });
        window.onhashchange = onhashchange;
        onhashchange();
        (function(__iced_k) {
          __iced_deferrals = new iced.Deferrals(__iced_k, {
            parent: ___iced_passed_deferral,
            filename: "gov-watch.iced",
            funcname: "process_data"
          });
          setTimeout((__iced_deferrals.defer({
            assign_fn: (function() {
              return function() {
                return __iced_deferrals.ret = arguments[0];
              };
            })(),
            lineno: 847
          })), 1000);
          __iced_deferrals._fulfill();
        })(function() {
          return load_fb_comment_count(".item");
        });
      });
    }