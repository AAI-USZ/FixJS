function(module_name, filename, options) {
    var file_contents, pathed_file;
    if (contains(RESERVED, module_name)) {
      throw "module name cannot be a reservered word: " + module_name;
    }
    pathed_file = mb.resolveSafe(filename, options);
    try {
      file_contents = fs.readFileSync(pathed_file, 'utf8');
    } catch (e) {
      console.log("Couldn't bundle " + filename + ". Does it exist?");
      return;
    }
    return "\nmb.require_define({'" + module_name + "': function(exports, require, module) {\n\n" + file_contents + "\n}});\n";
  }