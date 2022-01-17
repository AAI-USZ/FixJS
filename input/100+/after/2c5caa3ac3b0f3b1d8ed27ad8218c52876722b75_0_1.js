function() {
  $('.right').css({overflow: 'visible'})
  var checkScroll = function() {
    var logoHeight = parseFloat($('.right .logo').css('margin-top'))
      + $('.right .logo img').height()
      + parseFloat($('.right .content').css('margin-top'))
    var top = $(window).scrollTop() + 10 - logoHeight
    if (top < 0) {
      top = 0;
    }
    $('.right .content').css({'top': top + 'px'})
  }
  checkScroll()
  $(window).scroll(checkScroll)
  $(window).resize(checkScroll)
}