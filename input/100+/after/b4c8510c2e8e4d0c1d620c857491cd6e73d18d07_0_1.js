function(line) { // Go through each line of CSS
        var fileUrl = '',
            _file = '',
            newFiles = false;

        if (regexs.importRegex.test(line)) { // Check for @imports
            _file = utils.cleanURL(line.match(regexs.fileRegex)[0]);
            fileUrl = path.join(srcDir, _file);

            if (fs.existsSync(fileUrl)) {
                files.push(_file);

                if(options.watch && watched.indexOf(_file) === -1) newFiles = true;

                code.intermediate += fs.readFileSync(fileUrl, 'utf8') + '\n';

                if (options.watch && newFiles) { // If the watch option is enabled, watch for changes in the file to run Glue each time
                    if (!firstTime) console.log('');
                    utils.log('success', utils.colorize('blue', 'Glue ') + 'is ' + utils.colorize('green', 'watching ') + _file);
                    if (!firstTime) console.log('');
                    watchFile(fileUrl);
                    watched.push(_file);
                }
            } else {
                utils.log('error', utils.colorize('red', 'Could\'t find ' + fileUrl));
            }
        } else { // If there's no @import in the line, use the CSS line as is
            code.intermediate += line + '\n';
        }
    }