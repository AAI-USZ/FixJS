function() {
            console.error('append class:', path);
            var fd = fs.openSync(path, 'a');
            fs.writeSync(fd, '\nfoo\n  bar 1');
            fs.closeSync(fd);
          }