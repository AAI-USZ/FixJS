function (data, i) {
  var
    line = data.split("\r\n"),
    headers = line.slice(
      1, line.indexOf("", 1)
    ),
    i = 0,
    name,
    filename,
    file,
    parse,
    content
  ;
  while (i < headers.length) {
    parse = headers[i++];
    if (grabChunks.testName.test(parse)) {
      name = RegExp.$2;
      content = line.slice(
        line.indexOf("", i) + 1, line.length - 1
      ).join("\r\n");
      if (grabChunks.testFileName.test(parse)) {
        filename = RegExp.$2;
        if (filename.length) {
          file = {
            name: filename,
            type: polpetta.type(
              path.extname(filename),
              "application/octet-stream"
            ),
            error: false,
            size: 0
          };
          if (this.file.hasOwnProperty(name)) {
            if (this.file[name] instanceof Array) {
              this.file[name].push(file);
            } else {
              this.file[name] = [this.file[name], file];
            }
          } else {
            this.file[name] = file;
          }
          this.i++;
          fs.writeFile(
            file.tmp_name = path.join(
              TMP, name + Math.random() + filename
            ),
            content,
            "binary",
            grabChunks.writeFile.bind(
              file,
              this
            )
          );
        }
      } else if (content.length) {
        this.push(
          encodeURIComponent(name),
          "=",
          encodeURIComponent(content)
        );
      }
      break;
    }
  }
}