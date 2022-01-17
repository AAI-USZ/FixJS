function pm_chromeEventHandler(e) {
    var detail = e.detail;
    switch (detail.type) {
      case 'webapps-ask-install':
        handleInstallationPrompt(detail);
        break;
      case 'permission-prompt':
        handlePermissionPrompt(detail);
        break;
    }
  }