function() {
            ++c;
            if(c == cdb.files.length) {
                if(ready)
                    ready();
            }

        }