function (evt) {     
      mapMouseCoords(evt);

      var button = evt.button;
      if (Array.prototype.indexOf.call($jsilbrowserstate.heldButtons, button) === -1)
        $jsilbrowserstate.heldButtons.push(button);

      evt.preventDefault();
      evt.stopPropagation();
      return false;
    }