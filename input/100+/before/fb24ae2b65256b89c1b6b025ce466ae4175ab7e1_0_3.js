function (t, opt) {

    var i, $li,

      active = -1,

      count = 0,

      isIE6 = !window.XMLHttpRequest,

      checkText = opt.checkText || $(t).find('option:selected').text(),

      $fakeSelect = $('<span/>').addClass(opt.selectClass).text(checkText),

      $fakeOption = $('<ul/>').addClass(opt.optionClass).css({

        position: 'absolute',

        zIndex: '99',

        overflow: 'auto',

        overflowX: 'hidden'

      }),

      $bgIframe = $('<iframe/>').addClass('bgiframe').attr('frameborder', '0');



    // init DOM elements

    var init = function () {



      // avoid fake select take a incorrect width when using custom checkText

      var $tempLi;



      $(t).hide();

      $fakeSelect.insertAfter($(t));

      $fakeOption.insertAfter($fakeSelect);



      // fill up fake options with data by ajax or from original select

      if (opt.ajaxUrl) {

        $.ajax({

          type: 'GET',

          url: opt.ajaxUrl,

          dataType: opt.dataType,

          async: false,

          success: function (data) {

            opt.parseData.apply($fakeOption[0], [data]);

          }

        });

      } else {

        var $option = $(t).find('option');

        var len = $option.length;



        for (i = 0; i < len; i++) {

          $('<li/>').html($option.eq(i).text())

            .attr('data-option-val', $option.eq(i).val())

            .appendTo($fakeOption);

        }

      }



      $li = $fakeOption.find('li');

      if (opt.checkText) {

        $tempLi = $('<li>' + opt.checkText + '</li>');

        $fakeOption.append($tempLi);

      }



      if (opt.width > 0) {

        // custom select width

        $fakeSelect.width(opt.width);

        $fakeOption.width($fakeSelect[0].clientWidth);

      } else {

        var sw = $fakeSelect[0].clientWidth,

            ow = $fakeOption[0].clientWidth,

            scrollWidth;



        // if scroll bar appears

        if ($li.length > opt.maxLength) {

          $fakeOption.height($li[0].clientHeight * opt.maxLength);

        }



        // calculate the width of scroll bar, it should be 0 unless it appears

        scrollWidth = $fakeOption[0].offsetWidth -

          $fakeOption[0].clientLeft * 2 -

          $fakeOption[0].clientWidth;



        ow += scrollWidth;



        if (!opt.autoWidth) {

          $fakeOption.width(ow);

          $fakeSelect.width(ow - (sw - $fakeSelect.width()));

        }

      }



      $fakeOption.hide();

      if (opt.checkText) { $tempLi.remove(); }



      // TODO: to trigger the 'hasLayout' property in IE6.

      if (isIE6) {

        $li.css("zoom", "1");

      }

    };



    var displayUL = function () {

      var st = document.body.scrollTop || document.documentElement.scrollTop,

          wh = window.innerHeight || document.documentElement.clientHeight,

          dt = $fakeSelect.offset().top - st,

          db = wh - dt - $fakeSelect.outerHeight();



      // in some IE versions, it appears to get incorrect value with $.offset, use $.position for instead

      $fakeOption.show().css({

        left: $fakeSelect.position().left,

        top: ($fakeOption.outerHeight() > db && opt.autoPosition) ?

          $fakeSelect[0].offsetTop - $fakeOption[0].offsetHeight + $fakeSelect[0].clientTop :

          $fakeSelect[0].offsetTop + $fakeSelect[0].clientHeight + $fakeSelect[0].clientTop,

        height: Math.min($li[0].clientHeight * $li.length, $li[0].clientHeight * opt.maxLength)

      });



      // TODO: Solve it - to be covered by some other window's object(select, flash etc.) in IE6

      if (isIE6) {

        $bgIframe.show().css({

          position: 'absolute',

          zIndex: 1,

          left: $fakeOption.css('left'),

          top: $fakeOption.css('top'),

          width: $fakeOption.width(),

          height: $fakeOption.height()

        }).insertAfter($fakeOption);

      }

    };



    var hideUL = function () {

      $fakeOption.hide();

      if (isIE6) { $bgIframe.hide(); }

    };



    var moveSelect = function (step) {

      count = $li.length;

      active += step;

      $li.removeClass('selected');

      if (active < 0) {

        active = (opt.circleSelect) ? count - 1 : 0;

      } else if (active >= count) {

        active = (opt.circleSelect) ? 0 : count - 1;

      }

      $li.slice(active, active + 1).addClass('selected');

    };



    init();



    // event bind

    $fakeSelect.bind('click', function (e) {

      opt.callBackSelect.apply(this);



      $('.' + opt.optionClass).not($fakeOption).hide();



      if (isIE6) {

        $('.bgiframe').not($bgIframe).hide();

      }



      if ($fakeOption.is(':hidden')) {

        displayUL();

      } else {

        hideUL();

      }



      e.stopPropagation();

    });



    $li.mouseenter(function () {

      $li.removeClass('selected');

      $(this).addClass('selected');

      active = $li.index(this);

    }).click(function () {

        opt.callBackChoose.apply(this);

        $fakeSelect.html($(this).text());

      });



    $(document).bind('click',function () {

      hideUL();

    }).bind('keydown', function (e) {

        if (!$fakeOption.is(':visible')) return;

        switch (e.keyCode) {

          // Tab

          case 9:

          // Enter

          case 13:

            if (active !== -1) {

              var $selectLi = $li.slice(active, active + 1);

              opt.callBackChoose.apply($selectLi.get(0));

              $fakeSelect.html($selectLi.text());

            }

            hideUL();

            e.preventDefault();

            break;

          // Esc

          case 27:

            $fakeOption.hide();

            break;

          // Up

          case 38:

            e.preventDefault();

            moveSelect(-1);

            break;

          // Down

          case 40:

            e.preventDefault();

            moveSelect(1);

            break;

        }

      });



    $(t).bind('restore',function () {

      $fakeSelect.remove();

      $fakeOption.remove();

      $(t).show();

    }).bind('choose', function (opt) {

        var index;

        var arrText = [];



        $.extend(true, opt, arguments[1]);



        $.each($li, function (index, elem) {

          arrText.push(elem.firstChild.nodeValue);

        });



        if (opt.val && typeof opt.val == 'string') {

          index = $.inArray(opt.val, arrText);

        } else if (opt.index) {

          index = opt.index;

        } else {

          index = 0;

        }



        $li.eq(index).click();

      });

  }