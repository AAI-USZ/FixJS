function() {
      if (popup.closed) {
        clearInterval(checkPopupOpen);
        tryLoginAfterPopupClosed(oauthState);
      }
    }