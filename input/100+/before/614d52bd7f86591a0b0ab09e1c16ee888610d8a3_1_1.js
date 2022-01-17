function () {
        var $affix = $('<div></div>').appendTo('body').affix()
        $('body').trigger('scroll')
        ok($affix.hasClass('affix'), 'element has class affix')
      }