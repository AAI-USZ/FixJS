function restack(betID) {
  var chipStack = $('#' + betID).children();
  var parentMidX = $('#' + betID).width() / 2;
  var parentMidY = $('#' + betID).height() / 2;
  var tokenMid = 10;
  var leftVal = parentMidX - tokenMid;
  var topVal = parentMidY - tokenMid;
  
  $('#' + betID).empty();
  
  var tokenCount = 2;
  for (var i = 0; i < chipStack.size(); i++) {
    var numChipsPlaced = i;
    
    if (numChipsPlaced > 0) {
      topVal = topVal - 2;
    }
    
    var currClass = $(chipStack.get(i)).attr('class');
    var chip = $('<div class="' + currClass + '">' +
                   '<div class="token-top-stripe1"></div>' +
                   '<div class="token-top-stripe2"></div>' +
                   '<div class="token-right-stripe1"></div>' +
                   '<div class="token-right-stripe2"></div>' +
                   '<div class="token-bottom-stripe1"></div>' +
                   '<div class="token-bottom-stripe2"></div>' +
                   '<div class="token-left-stripe1"></div>' +
                   '<div class="token-left-stripe2"></div>' +
                   '<div class="token-ring">1</div>' +
                 '</div>');
    chip.css('left', leftVal);
    chip.css('top', topVal);
    chip.css('z-index', tokenCount);
    
    $('#' + betID).append(chip);

    tokenCount++;
  }
}