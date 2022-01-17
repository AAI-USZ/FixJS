function() {
  var DiaryBody, DiaryBodyHtml, converter;

  DiaryBody = $('.diary_body').text().replace(/^\s+?([^\s]+)/g, "$1").replace(/\s+$/g, '').replace(/([^\n])\n([^\n])/g, "$1  \n$2").replace(/(^|\s)(https?:\/\/[a-zA-Z0-9\.\-_~#!%\?&\/]+?)(\s|$)/g, '$1<a href="$2">$2</a>$3');

  converter = new Showdown.converter;

  DiaryBodyHtml = converter.makeHtml(DiaryBody);

  $('.diary_body').attr({
    "class": 'diary_body parsed'
  }).html(DiaryBodyHtml);

}