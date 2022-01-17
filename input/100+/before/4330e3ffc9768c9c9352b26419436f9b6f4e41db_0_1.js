function(event) {
      var startPosition = event.clientY;
      var currentPosition;
      var initMargin = '8rem';
      contactDetails.classList.add('up');

      if (contactDetails.classList.contains('no-photo'))
        return;

      var onMouseMove = function onMouseMove(event) {
        currentPosition = event.clientY;
        var newMargin = currentPosition - startPosition;
        if (newMargin > 0 && newMargin < 200) {
          contactDetails.classList.remove('up');
          var calc = '-moz-calc(' + initMargin + ' + ' + newMargin + 'px)';
          contactDetails.style.marginTop = calc;
        }
      };

      var onMouseUp = function onMouseUp(event) {
        contactDetails.classList.add('up');
        contactDetails.style.marginTop = initMargin;
        contactDetails.removeEventListener('mousemove', onMouseMove);
        contactDetails.removeEventListener('mouseup', onMouseUp);
      };

      contactDetails.addEventListener('mousemove', onMouseMove);
      contactDetails.addEventListener('mouseup', onMouseUp);
    }