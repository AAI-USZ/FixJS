function pm_handleInstallationPrompt(detail) {
    var app = detail.app;
    if (document.location.toString().indexOf(app.installOrigin) == 0) {
      sendResponse(detail.id, true);
      return;
    }

    var name = app.manifest.name;
    var locales = app.manifest.locales;
    var lang = navigator.language;
    if (locales && locales[lang] && locales[lang].name)
      name = locales[lang].name;

    var str = navigator.mozL10n.get('install', {
      'name': name, 'origin': app.origin
    });

    requestPermission(str, function pm_installYesCB() {
      dispatchResponse(detail.id, 'webapps-install-granted');
    }, function pm_installNoCB() {
      dispatchResponse(detail.id, 'webapps-install-denied');
    });
  }