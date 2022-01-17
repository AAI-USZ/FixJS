function takeScreenshot() {
    // Give feedback that the screenshot request was received
    navigator.mozVibrate(100);

    // Let chrome know we'd like a screenshot.
    // This is a completely non-standard undocumented API
    // for communicating with our chrome code.
    var screenshotProps = {
      detail: {
        type: 'take-screenshot'
      }
    };
    window.dispatchEvent(new CustomEvent('mozContentEvent', screenshotProps));
  }