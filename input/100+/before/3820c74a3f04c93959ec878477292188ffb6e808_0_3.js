function(item) {
    var container = $('fav-list-container');
    var elem = document.createElement('div');
    elem.id = this._getUIElemId(item);
    elem.textContent = item.frequency;
    container.appendChild(elem);

    var self = this;
    var _timeout = null;

    function onmouseup_item(event) {
      window.clearTimeout(_timeout);
      if (!self.editing) {
        setFreq(self._getElemFreq(event.target));
      } else {
        event.target.classList.toggle('selected');
      }
    }

    elem.addEventListener('mousedown', function onmousedown_item(event) {
      elem.addEventListener('mouseup', onmouseup_item, false);

      if (self.editing) {
        return;
      }

      window.clearTimeout(_timeout);
      _timeout = window.setTimeout(function() {
        // prevent opening the frequency
        elem.removeEventListener('mouseup', onmouseup_item, false);
        self._showPopupDelUI(elem, event);
      }, 1000);
    }, false);

    this._autoShowHideEditBtn();
  }