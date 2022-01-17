function(config) {

            if(config.error) {
                console.log('Error loading template: ', config.error);
            } else {
            
                var options = _loadCustomOptions(config.optionFiles);
                _logPreRun(config, options);
                
                cl.confirm('Continue? ', function(confirmed){               
                    if(confirmed) {
                        for(var j in config.dirs) {
                            _createDir(path.join(destRoot,config.dirs[j]), options);
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