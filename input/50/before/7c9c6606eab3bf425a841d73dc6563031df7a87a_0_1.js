function updateRedirectTimeout() {
    if (secondsRemaining > 0) {
      dom.setInner("#redirectTimeout", secondsRemaining);

      secondsRemaining--;
      setTimeout(updateRedirectTimeout, 1000);
    }
  }