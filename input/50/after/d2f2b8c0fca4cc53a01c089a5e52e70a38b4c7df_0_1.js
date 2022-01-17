function(f) {
            if (!f.match('_lock$'))
                processes.push(lthis._readJSON(dir + '/' + f));
        }