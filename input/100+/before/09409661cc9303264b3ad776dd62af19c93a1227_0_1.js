function drawJumpingArrow() {
  $('.jumping_arrow').nudgenudge({
    arrow: '/assets/' + $('#petition_page').attr('class').split(' ').filter(function(x){return x.indexOf('arrow')==x.length-5;})[0] + '.png',
    arrowWidth: 100,
    arrowHeight: 100,
    intensity: 'medium',  // the intensity of the nudge (low, medium, high)
    placement: 'left', // place on the left or the right of the target
    closeEvent: { "el": '.arrow', "event": 'click' }, // selector and event which triggers arrow hiding
    hideAfter: 0,  // hide after this many nudges, 0 = for the rest of eternity
    offsetX: 200, // adjust x position
    offsetY: -20 // adjust y position
  });
}