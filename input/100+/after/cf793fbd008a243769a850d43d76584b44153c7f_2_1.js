function walk(source, base, top){
    base == null && (base = path.normalize(source));
    function work(){
      fshoot('readFile', source, function(it){
        compileScript(source, it + "", base);
      });
    }
    fs.stat(source, function(e, stats){
      if (e) {
        if (top) {
          return walk(source + ".ls");
        }
        die(e);
      }
      if (stats.isDirectory()) {
        fshoot('readdir', source, function(it){
          it.forEach(function(it){
            walk(path.join(source, it), base);
          });
        });
      } else if (top || path.extname(source).toLowerCase() === '.ls') {
        if (o.watch) {
          watch(source, work);
        } else {
          work();
        }
      }
    });
  }