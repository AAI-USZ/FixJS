function() {
    var args, base, cakefile, callback, ext, generator, gitignore, name, neatfile, nemfile, npmignore, path, tplpath, _i;
    generator = arguments[0], name = arguments[1], args = 4 <= arguments.length ? __slice.call(arguments, 2, _i = arguments.length - 1) : (_i = 2, []), callback = arguments[_i++];
    if (name == null) {
      return error("Missing name argument");
    }
    path = resolve('.', name);
    base = basename(__filename);
    ext = extname(__filename);
    tplpath = resolve(__dirname, "project");
    gitignore = resolve(path, ".gitignore");
    npmignore = resolve(path, ".npmignore");
    neatfile = resolve(path, ".neat");
    nemfile = resolve(path, "Nemfile");
    cakefile = resolve(path, "Cakefile");
    ensureSync(path);
    try {
      touchSync(gitignore, render(resolve(tplpath, ".gitignore")));
      touchSync(npmignore, render(resolve(tplpath, ".npmignore")));
      touchSync(neatfile, render(resolve(tplpath, ".neat"), {
        name: name
      }));
      touchSync(nemfile, render(resolve(tplpath, "Nemfile")));
      touchSync(cakefile, render(resolve(tplpath, "Cakefile")));
      ensureSync(resolve(path, "lib"));
      ensureSync(resolve(path, "src"));
      ensureSync(resolve(path, "src/commands"));
      ensureSync(resolve(path, "src/generators"));
      ensureSync(resolve(path, "src/config"));
      ensureSync(resolve(path, "src/config/environments"));
      ensureSync(resolve(path, "src/config/initializers"));
      ensureSync(resolve(path, "templates"));
      ensureSync(resolve(path, "test"));
      ensureSync(resolve(path, "test/fixtures"));
      ensureSync(resolve(path, "test/spec"));
      touchSync(resolve(path, "lib/.gitkeep"));
      touchSync(resolve(path, "src/commands/.gitkeep"));
      touchSync(resolve(path, "src/generators/.gitkeep"));
      touchSync(resolve(path, "src/config/environments/.gitkeep"));
      touchSync(resolve(path, "src/config/initializers/.gitkeep"));
      touchSync(resolve(path, "templates/.gitkeep"));
      touchSync(resolve(path, "test/.gitkeep"));
      touchSync(resolve(path, "test/fixtures/.gitkeep"));
      touchSync(resolve(path, "test/spec/.gitkeep"));
    } catch (e) {
      return error("Cannot proceed to the generation of the project\n\n" + e.stack);
    }
    return typeof callback === "function" ? callback() : void 0;
  }