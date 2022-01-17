function _onclick_delete_button(event) {
      self.remove(self._getElemFreq(elem));
      updateFreqUI();
      _hidePopup();
      _clearEventListeners();
    }