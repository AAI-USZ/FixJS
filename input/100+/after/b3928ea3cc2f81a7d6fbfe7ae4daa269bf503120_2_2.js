function applySettings() {
  if (settings['hide_source']) {
    hide_source();
  } else {
    show_source();
  }
  if (settings['white_notice'] || settings['black_notice']) {
    show_ratings();
  } else {
    hide_ratings();
  }
  if (settings['black_notice']) {
    show_black_notice();
  } else {
    hide_black_notice();
  }
  if (settings['white_notice']) {
    show_white_notice();
  } else {
    hide_white_notice();
  }
  if (settings['hide_pinned']) {
    hide_pinned();
  } else {
    show_pinned();
  }
  if (settings['show_tags']) {
    show_tags();
  } else {
    hide_tags();
  }
}