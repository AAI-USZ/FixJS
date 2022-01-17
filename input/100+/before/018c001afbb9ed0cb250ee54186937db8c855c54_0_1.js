function (next) {
        var viewsPath = path.normalize('app/views');
        // May be running entirely viewless
        if (!existsSync(viewsPath)) {
          this.templateRegistry = {};
          next();
        }
        else {
          var templates = {}
            , files
            , file
            , noExtFile
            , fileExt
            , fileBaseName
            , pat = /\.(ejs|jade|hbs|mustache|ms|mu)$/;
          files = fileUtils.readdirR(viewsPath);
          for (var i = 0; i < files.length; i++) {
            file = files[i];
            fileExt = path.extname(file);
            fileBaseName = path.basename(file, fileExt).replace(/\.html$/, '');

            if (pat.test(file)) {
              // Strip .html and extension for easier detecting when rendering
              noExtFile = file.replace(/\.html.*$/, '');
              templates[noExtFile] = {
                  registered: true
                , file: file
                , ext: fileExt
                , baseName: fileBaseName
                , baseNamePath: noExtFile
              };
            }
          }
          this.templateRegistry = templates;
          next();
        }
      }