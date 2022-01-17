function(e) {
    var next, old, prev, up, _ref, _ref1, _ref2, _ref3;
    console.log(e.keyCode);
    if (in_sight) {
      switch (e.keyCode) {
        case 13:
          old = pop_point($('.point'));
          old.after("<section>" + cursor + "</section>");
          focus();
          if (old.html().length === 0) {
            old[0].outerHTML = '';
          }
          break;
        case 9:
          if ($('.point').html().length > 0) {
            if (e.shiftKey) {
              $('.point').before(cursor);
              old = $('.point').last();
            } else {
              $('.point').after(cursor);
              old = $('.point').first();
            }
            pop_point(old);
            focus();
          }
          break;
        case 46:
          if ($('.point').next().length > 0) {
            next = $('.point').next();
            old = pop_point($('.point'));
            old.remove();
            if (next[0].tagName === 'DIV') {
              set_point(next);
            } else if (next[0].tagName === 'SECTION') {
              next.prepend(cursor);
              focus();
            }
          } else if ($('.point').prev().length > 0) {
            prev = $('.point').prev();
            old = pop_point($('.point'));
            old.remove();
            if (prev[0].tagName === 'DIV') {
              set_point(prev);
            } else {
              prev.append(cursor);
              focus();
            }
          }
          break;
        case 38:
          if (_ref = $('.point').html(), __indexOf.call(empty, _ref) < 0) {
            old = pop_point($('.point'));
            old.before(cursor);
            focus();
          } else if ($('.point').prev().length > 0) {
            prev = $('.point').prev();
            if (prev[0].tagName === 'DIV') {
              set_point($('.point').prev());
            } else if (prev[0].tagName === 'SECTION') {
              prev.append(cursor);
            }
            $('.point')[1].outerHTML = '';
            focus();
          } else if ($('.point').parent().attr('id') !== 'editor') {
            $('.point').parent().before(cursor);
            old = $('.point').last();
            up = old.parent();
            old.remove();
            if (_ref1 = up.html(), __indexOf.call(empty, _ref1) >= 0) {
              up.remove();
            }
            focus();
          }
          break;
        case 40:
          if (_ref2 = $('.point').html(), __indexOf.call(empty, _ref2) < 0) {
            old = pop_point($('.point'));
            old.after(cursor);
            focus();
          } else if ($('.point').next().length > 0) {
            next = $('.point').next();
            if (next[0].tagName === 'DIV') {
              set_point($('.point').next());
            } else if (next[0].tagName === 'SECTION') {
              next.prepend(cursor);
            }
            $('.point').first().remove();
            focus();
          } else if ($('.point').parent().attr('id') !== 'editor') {
            $('.point').parent().after(cursor);
            old = $('.point').first();
            up = old.parent();
            old.remove();
            if (_ref3 = up.html(), __indexOf.call(empty, _ref3) >= 0) {
              up.remove();
            }
            focus();
          }
          break;
        default:
          return true;
      }
      return false;
    }
  }