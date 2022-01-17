function (next) {
        var viewsPath = path.normalize('app/views')
          , geddyTemplatesPath = path.join(__dirname, 'template', 'templates');

        // If viewsPath doesn't exist they're running viewless
        if(!existsSync(viewsPath)) {
          this.templateRegistry = {};
          next();
        } else {
          var files = fileUtils.readdirR(viewsPath)
            , geddyTemplatesFiles = fileUtils.readdirR(geddyTemplatesPath)
            , pat = /\.(ejs|jade|hbs|mustache|ms|mu)$/
            , templates = {}
            , file
            , origFile
            , noExtFile
            , fileExt
            , fileBaseName
            , addTemplate
            , createTemplates;

          // Adds a template object to templates
          addTemplate = function(noExtFile, file, origFile, fileExt, fileBaseName) {
            if(!origFile) origFile = noExtFile;

            templates[origFile] = {
                registered: true
              , file: file
              , ext: fileExt
              , baseName: fileBaseName
              , baseNamePath: noExtFile
            };
          };

          // Read dir list and create template objects from each file
          createTemplates = function(dir, isGeddy) {
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
          };

          // Loop through template files and add it them to registry
          createTemplates(files);

          // Add custom templates from `lib/template/templates`
          createTemplates(geddyTemplatesFiles, true);

          this.templateRegistry = templates;
          next();
        }
      }