function Loader(options) {
  let { modules, globals, resolve, paths } = override({
    paths: {},
    modules: {},
    globals: {},
    resolve: exports.resolve
  }, options);

  // We create an identity object that will be dispatched on an unload
  // event as subject. This way unload listeners will be able to assert
  // which loader is unloaded. Please note that we intentionally don't
  // use `loader` as subject to prevent a loader access leakage through
  // observer notifications.
  let destructor = freeze(create(null));

  // Make mapping array that is sorted from longest path to shortest path
  // to allow overlays.
  let mapping = keys(paths).
    sort(function(a, b) { return b.length - a.length }).
    map(function(path) { return [ path, paths[path] ] });

  // Define pseudo modules.
  modules = override({
    '@loader/unload': destructor,
    '@loader/options': options,
    'chrome': { Cc: Cc, Ci: Ci, Cu: Cu, Cr: Cr, Cm: Cm,
                CC: bind(CC, Components), components: Components }
  }, modules);

  modules = keys(modules).reduce(function(result, id) {
    // We resolve `uri` from `id` since modules are cached by `uri`.
    let uri = resolveURI(id, mapping);
    let module = Module(id, uri);
    module.exports = freeze(modules[id]);
    result[uri] = freeze(module);
    return result;
  }, {});

  // Loader object is just a representation of a environment
  // state. We freeze it and mark make it's properties non-enumerable
  // as they are pure implementation detail that no one should rely upon.
  return freeze(create(null, {
    destructor: { enumerable: false, value: destructor },
    globals: { enumerable: false, value: globals },
    mapping: { enumerable: false, value: mapping },
    // Map of module objects indexed by module URIs.
    modules: { enumerable: false, value: modules },
    // Map of module sandboxes indexed by module URIs.
    sandboxes: { enumerable: false, value: {} },
    resolve: { enumerable: false, value: resolve },
    // Main (entry point) module, it can be set only once, since loader
    // instance can have only one main module.
    main: new function() {
      let main;
      return {
        enumerable: false,
        get: function() { return main; },
        // Only set main if it has not being set yet!
        set: function(module) { main = main || module; }
      }
    }
  }));
}