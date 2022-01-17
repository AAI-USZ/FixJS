function() {
    var savedList = localStorage.getItem(this.KEYNAME);
    this._favList = !savedList ? { } : JSON.parse(savedList);

    this._showListUI();

    $('edit-button').addEventListener('click',
                         this.startEdit.bind(this), false);
    $('cancel-button').addEventListener('click',
                         this.cancelEdit.bind(this), false);
    $('delete-button').addEventListener('click',
                         this.delSelectedItems.bind(this), false);
    var self = this;
    var _timeout = null;
    var _container = $('fav-list-container');
    var _elem = null;

    function _onmouseup(event) {
      window.clearTimeout(_timeout);
      // only exec the logic when mouseup the same element as mousedown
      if (event.target == _elem) {
        if (!self.editing) {
          setFreq(self._getElemFreq(event.target));
        } else {
          event.target.classList.toggle('selected');
        }
      }
      _removeEventListeners();
    }

    function _removeEventListeners() {
      _container.removeEventListener('mouseup', _onmouseup, false);
      document.body.removeEventListener('mousemove',
                                        _onmousemove_body, false);
      _elem = null;
    }

    function _onmousemove_body(event) {
      // If mouse moved, do not show popup.
      window.clearTimeout(_timeout);
    }

    _container.addEventListener('mousedown', function _onmousedown(event) {
      _removeEventListeners();
      _container.addEventListener('mouseup', _onmouseup, false);

      if (self.editing) {
        return;
      }

      _elem = event.target;
      document.body.addEventListener('mousemove', _onmousemove_body, false);

      window.clearTimeout(_timeout);
      _timeout = window.setTimeout(function() {
        // prevent opening the frequency
        _removeEventListeners();
        self._showPopupDelUI(event);
      }, 1000);
    }, false);
  }