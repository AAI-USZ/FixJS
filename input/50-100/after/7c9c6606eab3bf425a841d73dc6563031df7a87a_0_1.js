function showRegistrationInfo(info) {
    dom.setInner("#email", info.email);

    if (info.returnTo) {
      dom.setInner(".website", info.returnTo);
      if (uiTimeoutID) uiTimeoutID = clearTimeout(uiTimeoutID);
      updateRedirectTimeout();
      dom.show(".siteinfo");
    }
  }