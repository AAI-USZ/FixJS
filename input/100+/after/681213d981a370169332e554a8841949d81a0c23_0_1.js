function customFunctionOnPgnGameLoad() {
  var $text = $('#ShowPgnText');
  var html = '<table><tbody><tr>';
  $text.find('span.move, span.variation').remove();
  $text.find('>a').each(function(it) {
    if (0 == it%2) {
      html += '</tr><tr><th>' + (it/2+1) + '</th>';
    }
    html += '<td>' + this.outerHTML + '</td>';
  });
  html += '</tr></tbody></table>';
  $text.html(html).find('tr:empty').remove();

  $('div.lichess_goodies a.rotate_board').click(function() {
    $('#GameBoard').toggleClass('flip');
    $('#player_links div:first').appendTo($('#player_links'));
    redrawBoardMarks();
    return false;
  });
  redrawBoardMarks();
  $("#GameButtons table").css('width', '514px').buttonset();
  $("#autoplayButton").click(refreshButtonset);
}