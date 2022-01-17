function generateConfig() {
  var config = {
    name: name,
    out: out,
    // use none optimize for debugging
    // optimize: "none",
    optimize: 'uglify',
    uglify: {
      // beautify for debugging
      // beautify: true,
      mangle: true
    },
    // TODO  above config setting is temporary, it shuould use mainConfigFile
    // https://github.com/toolness/friendlycode/pull/112#issuecomment-6625412
    // mainConfigFile: "./js/main.js",
  };
  Object.keys(requireConfig).forEach(function(name) {
    config[name] = requireConfig[name];
  });
  return config;
}