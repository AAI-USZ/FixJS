function pm_chromeEventHandler(evt) {
    var detail = evt.detail;
    switch (detail.type) {
      case 'webapps-ask-install':
        handleInstallationPrompt(detail);
        break;
      case 'permission-prompt':
        handlePermissionPrompt(detail);
        break;
    }
  }