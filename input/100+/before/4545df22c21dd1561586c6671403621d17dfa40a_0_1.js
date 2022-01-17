function isElementVisible(elem, /* Boolean */ in_full_page) {
  var win_top = window.scrollY / Zoom.current();
  var win_bottom = win_top + window.innerHeight;
  var win_left = window.scrollX / Zoom.current();
  var win_right = win_left + window.innerWidth;

  var pos = elem.getBoundingClientRect();
  var elem_top = win_top + pos.top;
  var elem_bottom = win_top + pos.bottom;
  var elem_left = win_left + pos.left;
  var elem_right = win_left + pos.left;

  var in_current_screen = elem_bottom >= win_top && elem_top <= win_bottom && elem_left <= win_right && elem_right >= win_left;
  var visible_in_screen = (pos.height !== 0 && pos.width !== 0) || (elem.children.length > 0);

  if (in_full_page) {
    return visible_in_screen
  } else {
    return in_current_screen
  }
}