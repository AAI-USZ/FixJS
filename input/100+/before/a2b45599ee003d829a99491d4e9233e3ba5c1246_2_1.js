function compile() {
  var buf = '';
  buf += '\n// CommonJS require()\n\n';
  buf += browser.require + '\n\n';
  buf += 'require.modules = {};\n\n';
  buf += 'require.resolve = ' + browser.resolve + ';\n\n';
  buf += 'require.register = ' + browser.register + ';\n\n';
  buf += 'require.relative = ' + browser.relative + ';\n\n';
  args.forEach(function(file){
    var js = files[file];
    file = file.replace('lib/', '');
    buf += '\nrequire.register("' + file + '", function(module, exports, require){\n';
    buf += js;
    buf += '\n}); // module: ' + file + '\n';
  });
  fs.writeFile('ejs.js', buf, function(err){
    if (err) throw err;
    console.log('  \033[90m create : \033[0m\033[36m%s\033[0m', 'ejs.js');
    console.log();
  });
}