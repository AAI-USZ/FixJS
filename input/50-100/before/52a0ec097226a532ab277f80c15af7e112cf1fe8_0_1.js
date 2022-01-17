function() {
  var DiaryBody, DiaryBodyHtml, converter;

  DiaryBody = $('.diary_body').text().replace(/^\s+?([^\s]+)/, "$1").replace(/\s+$/, '').replace(/([^\n])\n([^\n])/g, "$1  \n$2");

  converter = new Showdown.converter;

  DiaryBodyHtml = converter.makeHtml(DiaryBody);

  $('.diary_body').replaceWith('<div class="diary_body parsed">' + DiaryBodyHtml + '</div>');

}