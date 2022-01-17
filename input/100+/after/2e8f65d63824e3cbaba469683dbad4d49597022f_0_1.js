function createScrollToStartView(carousel) {
  var result = Ti.UI.createButton({
    title: 'Scroll to Start',
  });
  result.addEventListener('click', function(e) {
    carousel.scrollToIndex(0, { animated: false, duration: 0.1 });
  });
  return result;
}