function drawModalAfterSigning() {
  var drawModalArrow = function() { drawJumpingArrow('#thanksModal .jumping_arrow', {"el": "#thanksModal", "event": "hide"}); };
  var drawMainArrow = function() { drawJumpingArrow('#thanks-for-signing-message .jumping_arrow', {"el": {}, "event": "hide"}); };
 
  if (screen.width > 480 && $('#thanksModal').length) {
    $('#thanksModal').modal('toggle');
    drawModalArrow();
    $('#thanksModal').on('hide', drawMainArrow);
  } else {
    drawMainArrow();
  }
}