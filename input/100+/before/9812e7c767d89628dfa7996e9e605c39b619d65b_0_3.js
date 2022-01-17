function() {
      var clientSize = window.getClientSize();
      $deatilsPanel.setStyles({
        width: clientSize.width - pinnedOffsetX,
        height: clientSize.height
      });
      $detailsClose.setStyles({
        left: Math.max(710 - 20, clientSize.width - pinnedOffsetX - 55)
      });
    }