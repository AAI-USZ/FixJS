f        
        var version = '0.0.1';
        //cl : command line interface
        var cl = cmdr.version(version);  

        //todo: read .options
        cl.option('-s --sourcetemplate [value]','Set the source template folder (absolute path). Defaults to jen/template/');
        cl.option('bbqreq','backbone with require generators.');

        cl.parse(process.argv);

        var defaultOptionsPath = path.join(__dirname, 'default-options.json');
        var defaultOptions = fs.readFileSync(defaultOptionsPath,'ascii');
            defaultOptions = JSON.parse(defaultOptions);

        //change template source. (options -s)
        if(cl.sourcetemplate) {
            //commander mutates response: true if flag with no value, if value set, then value. 
            if(cl.sourcetemplate === true){
                console.log("template source folder currently", getSourceTemplate());
            } else
            if (path.existsSync(cl.sourcetemplate)) {
                defaultOptions.sourceTemplateFolder = cl.sourcetemplate;
                fs.writeFileSync(defaultOptionsPath, JSON.stringify(defaultOptions));
                console.log('Template source folder set to:' + defaultOptions.sourceTemplateFolder);
            } else {
                console.log("Folder not found: ", cl.sourcetemplate, ". Template Source folder not changed.");
            }
            process.exit();
        } 

   
        var templateFolder =  defaultOptions.sourceTemplateFolder !=='' ? defaultOptions.sourceTemplateFolder :  path.join(__dirname, '/../template/');
        
        var sourceRoot = path.join(templateFolder, args[1]);
        var destRoot = path.join(process.cwd());
        var destDir = destRoot.match(/^.*\/(.*)$/).pop();

        console.log('--------------------');
        console.log('Ready to Generate', args[1], args[2], 'TO:', destRoot);
        


        //todo: read .options.js for options.
        //default is /template/.options.js : reads out the other generators.

        //if(args.length < 3) {
        //    console.log('insufficent arguments.\n Expecting at least 2. \n(e.g:\n jen pc appname contextSelector). See jen --h');
        //    return;
        //}


        var options={
            //todo:choice. app file/folder name. formatted according to particular coding standards convention.
            app: args[2].toDash(), 
            contextSelector: args[3].toDash(),
            dir: destDir
        };


        new TemplateModel(sourceRoot, function(config) {

            if(config.error) {
                console.log('Error loading template: ', config.error);
            } else {

                
                _logPreRun(config);
                _loadCustomOptions(config.optionFiles);

                cl.confirm('Continue? ', function(confirmed){               
                    if(confirmed) {
                        for(var j in config.dirs) {
                            _createDir(path.join(destRoot,config.dirs[j]));
                        }
                        for(var i in config.files) {
                            _createFile(options, config.files[i], sourceRoot, destRoot);
                        }
                        console.log('Done');
                    } else {
                        console.log('Cancelled');
                    }
                     process.exit();
                });
            }

        });
            

            
        function getSourceTemplate() {
            return  defaultOptions.sourceTemplateFolder !=='' ? defaultOptions.sourceTemplateFolder :  path.join(__dirname, '/../template/');
        }

        /*
         * _options.js files in template folders loadeer.
         */
        function _loadCustomOptions(optionFiles) {
            console.log("loaded custom javascript options:\n",optionFiles);
            for(var i in optionFiles) {
                require(optionFiles[i]);
            }
        };

        /*
         _templatePathName
         handle {{params}} in file names/paths
        */
        function _templatePathName(path) {
            if(path.indexOf('{{') !== -1) {
                var tmpl = Handlebars.compile(path);
                path = tmpl(options);
            }
            return path;
        }

        /*
        * user feedback of outcome before running generator.
        */
        function _logPreRun(config) {

            sys.puts('Folders:');
            for(var i in config.dirs) {
              var path = _templatePathName(config.dirs[i]);
              sys.puts(path);
            }

            sys.puts('Files:');
            for(var j in config.files) {
              var filePath = _templatePathName(config.files[j]);
              sys.puts(filePath);
            }
            console.log('--------------------');
        }


        function _createFile(options, fileName, sourceRoot, destRoot) {
            var err;
            var dest = path.join(destRoot, fileName) ;
            dest = _templatePathName(dest);

            if(existsSync(dest)) {
                err = 'file exists: ' + '  ' + dest + '   -Not Overwritten.';
                sys.puts(err);
            }

            var sourceFile = path.join(sourceRoot, fileName );
            if(!existsSync(sourceFile)) {
                err = 'template file not found' + ' ' + sourceFile + '. Halting generation of: ' + dest;
                sys.puts(err);
            }

            if (!err) {
                var sourceTemplate = fs.readFileSync(sourceFile, 'ascii');
                var template = Handlebars.compile(sourceTemplate);
                var result = template(options);
                fs.writeFileSync(dest, result);
                sys.puts('created file: ' + dest);
            }
        }

        function _createDir(dir) {
            dir = _templatePathName(dir);
            if (existsSync(dir)) {
                sys.puts('dir exists:' + '  ' + dir);
            } else {
                fs.mkdirSync(dir);
                sys.puts('created dir: ' + '  ' + dir);
            }
        }
    };
