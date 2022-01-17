function(exists) {
            if (!exists) {
                traversing--;
                ev.emit('end');
                return;
            }

            fsm.readdir(folder, function(err, files) {
                if (err) {
                    console.trace('Shit: ' + err);
                    return;
                }
                for (var i = 0; i < files.length; i++) {
                    var file = files[i];
                    var full = PathModule.join(folder, file);
                    //console.log('Found: ' + full);
                    if (part && part.indexOf('*') > -1) { // pattern to check
                        // protect periods and replace asterisks
                        var pattern = '^' + part.replace(/\./g, '\\.').replace(/\*/g, '.+') + '$';
                        //console.log('using pattern: ' + pattern);
                        var pattern = new RegExp(pattern);
                        if (!pattern.test( file )) continue;
                    }
                    var s = fsm.statSync(full);
                    if (s.isDirectory()) {
                        if (parts.length) {
                        //console.log('recursing into ' + full);
                        walky(full, parts, results, callback);
                        }
                    } else {
                        //console.log('file: ' + full);
                        if (!parts.length) results.push(full);
                    }
                }
                traversing--;
                ev.emit('end');
            });
        }