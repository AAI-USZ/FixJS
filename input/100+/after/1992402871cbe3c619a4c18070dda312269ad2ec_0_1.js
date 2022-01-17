function startup(reason, options) {
  if (reason === 'startup')
    return wait(reason, options);

  // Inject globals ASAP in order to have console API working ASAP
  let loader = options.loader;
  override(loader.globals, globals);

  // Try initializing localization module before running main module. Just print
  // an exception in case of error, instead of preventing addon to be run.
  try {
    // Do not enable HTML localization while running test as it is hard to
    // disable. Because unit tests are evaluated in a another Loader who
    // doesn't have access to this current loader.
    if (options.loader.main.id !== "test-harness/run-tests")
      require("api-utils/l10n/html").enable();
  } catch(error) {
    console.exception(error);
  }
  try {
    // TODO: When bug 564675 is implemented this will no longer be needed
    // Always set the default prefs, because they disappear on restart
    setDefaultPrefs();

    // this is where the addon's main.js finally run.
    let program = load(loader, loader.main).exports;

    if (typeof(program.onUnload) === 'function')
      unload(program.onUnload);

    if (typeof(program.main) === 'function') {

      program.main({
        loadReason: loadReason,       // Will be Merge conflict see: Bug 771825
        staticArgs: staticArgs 
      }, { 
        print: function print(_) { dump(_ + '\n') },
        quit: exit 
      });
    }
  } catch (error) {
    console.exception(error);
    throw error;
  }
}