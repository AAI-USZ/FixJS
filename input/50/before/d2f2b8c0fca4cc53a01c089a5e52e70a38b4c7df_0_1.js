function(f) {
            if (!f.match('\.lock$'))
                processes.push(lthis._readJSON(dir + '/' + f));
        }