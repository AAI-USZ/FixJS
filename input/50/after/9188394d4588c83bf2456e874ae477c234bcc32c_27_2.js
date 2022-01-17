function kc_onResize(nWidth, nHeight, fWidth, fHeihgt) {
      if (IMERender.ime.dataset.hidden)
        return;

      IMERender.resizeUI(_currentLayout);
      _updateTargetWindowHeight(); // this case is not captured by the mutation
                                   // observer so we handle it apart

     // TODO: need to check how to handle orientation change case to
     // show corrent word suggestions
      this.updateLayoutParams();
    }