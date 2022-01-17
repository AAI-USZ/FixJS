function (evt) {
      mapMouseCoords(evt);
      
      var button = evt.button;
      $jsilbrowserstate.heldButtons = $jsilbrowserstate.heldButtons.filter(function (element, index, array) {
        (element !== button);
      });

      evt.preventDefault();
      evt.stopPropagation();
      return false;
    }