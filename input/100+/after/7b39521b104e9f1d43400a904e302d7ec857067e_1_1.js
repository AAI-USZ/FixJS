function startup(reason, options) {
  if (reason === 'startup')
    return wait(reason, options);

  // Inject globals ASAP in order to have console API working ASAP
  Object.defineProperties(options.loader.globals, descriptor(globals));

  // Load localization manifest and .properties files.
  // Run the addon even in case of error (best effort approach)
  require('api-utils/l10n/loader').
    load(rootURI).
    then(null, function failure(error) {
      console.info("Error while loading localization: " + error.message);
    }).
    then(function onLocalizationReady(data) {
      // Exports data to a pseudo module so that api-utils/l10n/core
      // can get access to it
      definePseudo(options.loader, '@l10n/data', data);
      run(options);
    });
}