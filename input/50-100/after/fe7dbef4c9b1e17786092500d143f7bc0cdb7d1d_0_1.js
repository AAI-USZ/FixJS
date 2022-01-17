function renderExternalLink(text, url, options) {
  if (isEmpty(options)) {
    options = {};
  }
  return '<a href="'+url+'" '+(isEmpty(options.class) ? '' : 'class="'+options.class+'"')+'>'+text+' <i class="icon-share link-external"></i></a>';
}