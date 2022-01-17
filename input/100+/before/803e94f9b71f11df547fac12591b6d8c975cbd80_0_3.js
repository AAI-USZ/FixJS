function (err, ddoc) {
            if (err) {
                return callback(
                    'Failed to app from doc: ' + ddoc_url + '\n' + err
                );
            }
            var app_url;
            if (ddoc._attachments) {
                if (ddoc._attachments['index.html']) {
                    app_url = ddoc_url + '/index.html';
                }
                else if (ddoc._attachments['index.htm']) {
                    app_url = ddoc_url + '/index.htm';
                }
            }
            if (ddoc.rewrites && ddoc.rewrites.length) {
                app_url = ddoc_url + '/_rewrite/';
            }

            var doc = {
                // TODO: use base64 encoding polyfill for older browsers?
                _id: window.btoa(ddoc_url),
                ddoc_url: ddoc_url,
                ddoc_rev: ddoc._rev,
                type: 'database',
                url: app_url,
                db: ddoc_url.split('/')[1],
                name: ddoc._id.split('/')[1],
                title: null
            };
            if (!app_url) {
                // show document in futon
                doc.url = '/_utils/document.html?' +
                    ddoc_url.replace(/^\//, '');
                doc.unknown_root = true;
            }
            if (ddoc.app) {
                if (ddoc.app.icons) {
                    doc.icons = ddoc.app.icons;
                    doc.dashicon = ddoc.app.icons['22'];
                }
                if (ddoc.app.title) {
                    doc.title = ddoc.app.title;
                }
            }

            console.log(['update', ddoc_url, doc]);
            exports.update(doc, callback);
        }