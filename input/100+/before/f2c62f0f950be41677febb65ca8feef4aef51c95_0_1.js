function compilar(path) {
    var files = fs.readdirSync(src_path);
    var result = '';

    for (var i=0;i<files.length;i++) {
        if (!files[i].match(regexpSwp)) {
		var filename = files[i].replace(".dust","");
		var contents = fs.readFileSync(src_path + files[i], 'utf8');
		result += dust.compile(contents, filename);
	}
    }

    var filepath = public_path + "templates.js";

    fs.writeFile(filepath, result, function (err) {
      if (err) throw err;
      console.log('Saved');
    });
  }