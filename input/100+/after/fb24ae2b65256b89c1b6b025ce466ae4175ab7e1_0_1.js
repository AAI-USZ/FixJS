function () {



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

      if (opt.checkText || opt.ajaxUrl) {

        $tempLi = $('<li>' + checkText + '</li>');

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

      if (typeof $tempLi !== 'undefined') { $tempLi.remove(); }



      // TODO: to trigger the 'hasLayout' property in IE6.

      if (isIE6) {

        $li.css("zoom", "1");

      }

    }