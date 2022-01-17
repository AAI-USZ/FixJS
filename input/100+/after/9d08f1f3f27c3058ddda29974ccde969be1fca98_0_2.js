function(urlText, seleniumVersion) {
  var anchorIndex = urlText.indexOf('#');
  if (anchorIndex !== -1) {
    urlText = urlText.substring(0, anchorIndex);
  }
  var url = new builder.Url(urlText);

  if (!url.hostname() || urlText.substring(0, 6) === 'about:') {
    alert("The URL is not valid and cannot be loaded.");
    jQuery("#startup-url").focus();
    return;
  }
  // Delete cookies for given URL.
  builder.deleteURLCookies(url.href());
  
  // Now load the page - both to ensure we're on the right page when we start recording
  // and to ensure that we get a clean page free of cookie influence.
  // Don't show the record interface until the new page has loaded.
  var isLoading = false;
  builder.record.pageLoadListener = function(urlText, pageloading) {
    var url = new builder.Url(urlText);
    if (pageloading) {
      isLoading = true;
      jQuery('#heading-record').addClass('is-on');
    } else {
      jQuery('#heading-record').removeClass('is-on');
      if (isLoading) {
        builder.record.recording = true;    
        builder.gui.switchView(builder.views.script);
        builder.suite.addScript(new builder.Script(seleniumVersion));
        if (seleniumVersion === builder.selenium1) {
          builder.getScript().addStep(new builder.Step(builder.selenium1.stepTypes.open, url.href()));
          builder.record.recordStep(new builder.Step(builder.selenium1.stepTypes.waitForPageToLoad, "60000"));
        } else {
          builder.getScript().addStep(new builder.Step(builder.selenium2.stepTypes.get, url.href()));
        }
        builder.stepdisplay.update();
        builder.pageState.removeListener(builder.record.pageLoadListener);
        builder.record.continueRecording();
      }
      isLoading = false;
    }
  };
  builder.pageState.addListener(builder.record.pageLoadListener);
  window.bridge.getRecordingWindow().location = url.href();
}