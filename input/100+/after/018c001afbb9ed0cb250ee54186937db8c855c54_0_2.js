function(dir, isGeddy) {
            for (var i = 0; i < dir.length; i++) {
              file = dir[i];
              fileExt = path.extname(file);
              fileBaseName = path.basename(file, fileExt).replace(/\.html$/, '');

              if(isGeddy) origFile = 'geddy/' + fileBaseName;

              if(pat.test(file)) {
                // Strip .html and extension for easier detecting when rendering
                if(isGeddy) {
                  noExtFile = 'geddy/' + fileBaseName;
                } else noExtFile = file.replace(/\.html.*$/, '');

                addTemplate(noExtFile, file, origFile, fileExt, fileBaseName);
              }
            }
          }