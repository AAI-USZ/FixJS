function _onclick_delete_button(event) {
      self.remove(self._getElemFreq(element));
      updateFreqUI();
      _hidePopup();
      _clearEventListeners();
    }