function() {
      var imageFinder = document.getElementById('hw-image-finder');
      imageFinder.parentNode.removeChild(imageFinder);
      Event.stopObserving(document, 'keyup', documentKeyUp, false);
      Event.stopObserving(document, 'click', documentClick, false);
      return false;
    }