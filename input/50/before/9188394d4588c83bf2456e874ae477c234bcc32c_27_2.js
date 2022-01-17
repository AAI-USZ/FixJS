function kc_onResize(nWidth, nHeight, fWidth, fHeihgt) {
      if (IMERender.ime.dataset.hidden)
        return;

      IMERender.resizeUI(_currentLayout);
      _updateTargetWindowHeight(); // this case is not captured by the mutation
                                   // observer so we handle it apart
    }