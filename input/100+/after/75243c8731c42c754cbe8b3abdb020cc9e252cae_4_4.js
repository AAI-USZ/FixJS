function (target, tip, classes) {
      var width, nub, nubHeight, nubWidth, row, objPos;

      tip.css('visibility', 'hidden').show();

      width = target.data('width');
      nub = tip.children('.nub');
      nubHeight = nub.outerHeight();
      nubWidth = nub.outerWidth();

      objPos = function (obj, top, right, bottom, left, width) {
        return obj.css({
          'top' : top,
          'bottom' : bottom,
          'left' : left,
          'right' : right,
          'width' : (width) ? width : 'auto'
        }).end();
      };

      objPos(tip, (target.offset().top + target.outerHeight() + 10), 'auto', 'auto', target.offset().left, width);
      objPos(nub, -nubHeight, 'auto', 'auto', 10);

      if ($(window).width() < 767) {
        row = target.parents('.row');
        tip.width(row.outerWidth() - 20).css('left', row.offset().left).addClass('tip-override');
        objPos(nub, -nubHeight, 'auto', 'auto', target.offset().left);
      } else {
        if (classes.indexOf('tip-top') > -1) {
          objPos(tip, (target.offset().top - tip.outerHeight() - nubHeight), 'auto', 'auto', target.offset().left, width)
            .removeClass('tip-override');
          objPos(nub, 'auto', 'auto', -nubHeight, 'auto');
        } else if (classes.indexOf('tip-left') > -1) {
          objPos(tip, (target.offset().top + (target.outerHeight() / 2) - nubHeight), 'auto', 'auto', (target.offset().left - tip.outerWidth() - 10), width)
            .removeClass('tip-override');
          objPos(nub, (tip.outerHeight() / 2) - (nubHeight / 2), -nubHeight, 'auto', 'auto');
        } else if (classes.indexOf('tip-right') > -1) {
          objPos(tip, (target.offset().top + (target.outerHeight() / 2) - nubHeight), 'auto', 'auto', (target.offset().left + target.outerWidth() + 10), width)
            .removeClass('tip-override');
          objPos(nub, (tip.outerHeight() / 2) - (nubHeight / 2), 'auto', 'auto', -nubHeight);
        }
      }
      tip.css('visibility', 'visible').hide();
    }