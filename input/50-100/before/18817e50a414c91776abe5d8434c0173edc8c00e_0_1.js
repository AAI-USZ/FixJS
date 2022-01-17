function (cb) {
                if( config.googleReader ) {
                    var text = $("#current-entry .entry-container a.entry-title-link").text();
                    if( ! text ) text = $('.entry').first().find(".entry-container a.entry-title-link").text();
                    cb(text);
                } else if(document.getSelection() != false) {
                    cb('"' + document.getSelection().toString() + '"');
                } else {
                    cb(document.title);
                }
            }