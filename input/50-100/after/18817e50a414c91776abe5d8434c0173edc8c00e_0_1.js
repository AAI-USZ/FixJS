function (cb) {
                if( document.getSelection() !== false ) {
                    cb('"' + document.getSelection().toString() + '"');
                } else if( config.googleReader ) {
                    var text = $("#current-entry .entry-container a.entry-title-link").text();
                    if( ! text ) text = $('.entry').first().find(".entry-container a.entry-title-link").text();
                    cb(text);
                } else {
                    cb(document.title);
                }
            }