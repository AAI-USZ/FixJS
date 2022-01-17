function(event) {
    var element = event.target;
    // Show popup just below the cursor
    var box = $('popup-delete-box');
    box.hidden = false;
    var max = document.body.clientWidth - box.clientWidth - 10;
    var min = 10;
    var left = event.clientX - box.clientWidth / 2;
    left = left < min ? min : (left > max ? max : left);
    box.style.top = event.clientY + 10 + 'px';
    box.style.left = left + 'px';

    function _onclick_delete_button(event) {
      self.remove(self._getElemFreq(element));
      updateFreqUI();
      _hidePopup();
      _clearEventListeners();
    }

    function _hidePopup() {
      $('popup-delete-box').hidden = true;
      $('popup-delete-button').removeEventListener('click',
                                 _onclick_delete_button, false);
    }

    function _mousedown_del_box(event) {
      event.stopPropagation();
    }

    function _mousedown_body(event) {
      _hidePopup();
      _clearEventListeners();
    }

    function _clearEventListeners() {
      document.body.removeEventListener('mousedown', _mousedown_body, false);
      $('popup-delete-box').removeEventListener('mousedown',
                              _mousedown_del_box, true);
    }

    function _addEventListeners() {
      // Hide popup when tapping
      document.body.addEventListener('mousedown', _mousedown_body, false);
      $('popup-delete-box').addEventListener('mousedown',
                              _mousedown_del_box, true);
    }
    _addEventListeners();

    var self = this;

    $('popup-delete-button').addEventListener('click',
                               _onclick_delete_button, false);
  }