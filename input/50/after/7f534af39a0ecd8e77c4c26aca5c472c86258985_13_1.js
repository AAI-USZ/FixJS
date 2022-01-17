function showRegistrationInfo(info) {
    dom.setInner("#email", info.email);

    if (info.returnTo) {
      dom.setInner(".website", info.returnTo);
      updateRedirectTimeout();
      dom.show(".siteinfo");
    }
  }