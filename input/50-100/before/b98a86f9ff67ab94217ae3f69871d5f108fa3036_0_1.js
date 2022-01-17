function() {
      var imageFinder = document.getElementById('hw-image-finder');
      imageFinder.parentNode.removeChild(imageFinder);
      Event.stopObserving(document, 'keyup', closePicker, false);
      Event.stopObserving(document, 'click', closePicker, false);
      return false;
    }