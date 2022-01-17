function(err, props) {
    // Set a few grunt-plugin-specific properties.
    props.short_name = props.name.replace(/^grunt[\-_]?/, '');
    props.main = 'grunt.js';
    props.npm_test = 'grunt test';
    props.bin = 'bin/' + props.name;
    props.dependencies = {grunt: props.grunt_version};
    props.keywords = ['gruntplugin'];

    // Files to copy (and process).
    var files = init.filesToCopy(props);

    // Add properly-named license files.
    init.addLicenseFiles(files, props.licenses);

    // Actually copy (and process) files.
    init.copyAndProcess(files, props);

    // Generate package.json file.
    init.writePackageJSON('package.json', props);

    // All done!
    done();
  }