function(config) {

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

        }