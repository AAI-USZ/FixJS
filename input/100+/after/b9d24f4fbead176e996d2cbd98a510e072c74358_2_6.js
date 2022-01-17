function() {
    var book, explanation_needed, ___iced_passed_deferral, __iced_deferrals, _i, _len,
      _this = this;
    ___iced_passed_deferral = iced.findDeferral(arguments);
    if (initialized) return;
    initialized = true;
    for (_i = 0, _len = all_books.length; _i < _len; _i++) {
      book = all_books[_i];
      $("#books").prepend("<li data-book='" + book + "' class='book'><a href='#'>" + book + "</a></li>");
    }
    run_templates("item", {
      items: loaded_data
    }, "#items");
    explanation_needed = true;
    if ((typeof localStorage !== "undefined" && localStorage !== null ? localStorage.explained : void 0) != null) {
      explanation_needed = false;
    }
    $("#explanation .close").click(function() {
      if (typeof localStorage !== "undefined" && localStorage !== null) {
        localStorage.explained = true;
      }
      $("#explanation").modal('hide');
      return false;
    });
    $("#show-explanation").click(function() {
      $("#explanation").modal('show');
      return false;
    });
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
        lineno: 783
      })), 50);
      __iced_deferrals._fulfill();
    })(function() {
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
          filename: 'gov-watch.iced',
          funcname: 'process_data'
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
      });
    });
  }