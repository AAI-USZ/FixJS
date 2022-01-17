function adjustBlogHeaders() {
  if(isMobileView)
    return;

  $('.blog-section article hgroup').each(function(i, e) {
    $(e).find('h3 a').css({
       'margin-top': '-' + ($(e).height() + 100) + 'px' 
    }).addClass('adjusted');
  });
}