function (project_dir, output_path, options) {
  options = options || {};

  try {
    // Create a bundle, add the project
    packages.flush();
    var bundle = new Bundle;
    var project = packages.get_for_dir(project_dir, ignore_files);
    bundle.use(project);

    // Include tests if requested
    if (options.include_tests) {
      // in the future, let use specify the driver, instead of hardcoding?
      bundle.use(packages.get('test-in-browser'));
      bundle.include_tests(project);
    }

    // Minify, if requested
    if (!options.no_minify)
      bundle.minify();

    // Write to disk
    var dev_bundle_mode =
          options.skip_dev_bundle ? "skip" : (
            options.symlink_dev_bundle ? "symlink" : "copy");
    bundle.write_to_directory(output_path, project_dir, dev_bundle_mode, options.subapp);


    if (bundle.errors.length)
      return bundle.errors;
  } catch (err) {
    return ["Exception while bundling application:\n" + (err.stack || err)];
  }
}