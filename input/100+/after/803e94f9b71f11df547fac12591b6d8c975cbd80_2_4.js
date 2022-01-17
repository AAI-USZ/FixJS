function (exports, require, $, _) {

    var couchr = require('couchr'),
        async = require('async'),
        events = require('events'),
        utils = require('./utils'),
        DATA = require('../dashboard-data');


    var logErrorsCallback = function (err) {
        if (err) {
            return console.error(err);
        }
    };

    exports.get = function (id) {
        return _.detect(DATA.databases, function (db) {
            return db._id === id;
        });
    };

    exports.update = function (newDoc, /*optional*/callback) {
        callback = callback || logErrorsCallback;

        var oldDoc = exports.get(newDoc._id);
        var doc = oldDoc ? _.extend(oldDoc, newDoc): newDoc;

        var url = 'api/' + encodeURIComponent(doc._id);
        couchr.put(url, doc, function (err, data) {
            if (err) {
                return callback(err);
            }
            doc._rev = data.rev;

            // update if already exists
            for (var i = 0; i < DATA.databases.length; i++) {
                var db = DATA.databases[i];
                if (db._id === doc._id) {
                    DATA.databases.splice(i, 1, doc);
                    return callback();
                }
            };

            // does not exist, create new db doc
            var dbs = DATA.databases;
            dbs.push(doc);
            dbs = _.sortBy(dbs, function (db) {
                return db.title;
            });
            DATA.databases = _.uniq(dbs, true, function (db) {
                return db._id;
            });
            return callback();
        });
    };

    // Feature test (from Modernizr)
    var hasStorage = (function() {
        try {
            localStorage.setItem('dashboard-test', 'dashboard-test');
            localStorage.removeItem('dashboard-test');
            return true;
        } catch(e) {
            return false;
        }
    }());

    exports.saveLocal = function () {
        if (hasStorage) {
            localStorage.setItem(
                'dashboard-databases', JSON.stringify(DATA.databases)
            );
        }
    };

    exports.exists = function (ddoc_url, /*optional*/ddoc_rev) {
        var id = window.btoa(ddoc_url);
        var db = exports.get(id);
        if (db) {
            if (ddoc_rev) {
                return db.ddoc_rev === ddoc_rev;
            }
            return true
        }
        return false;
    };

    exports.refresh = function (/*optional*/callback) {
        callback = callback || logErrorsCallback;
        var ev = new events.EventEmitter();

        couchr.get('/_api/_all_dbs', function (err, dbs) {
            if (err) {
                return callback('Failed to update app list\n' + err);
            }
            var completed = 0;
            async.forEachSeries(dbs, function (db, cb) {
                exports.refreshDB(db, function (err) {
                    if (err) {
                        return cb(err);
                    }
                    completed++;
                    ev.emit(
                        'progress',
                        Math.floor(completed / dbs.length * 100)
                    );
                    cb();
                });
            },
            function (err) {
                if (err) {
                    return callback(err);
                }
                exports.saveLocal();
                callback();
            });
        });
        return ev;
    };

    exports.refreshDB = function (db, /*optional*/callback) {
        callback = callback || logErrorsCallback;

        var url = '/_api/' + encodeURIComponent(db) + '/_all_docs';
        var q = {
            startkey: '"_design/"',
            endkey: '"_design0"'
        };
        couchr.get(url, q, function (err, data) {
            if (err) {
                return callback(
                    'Failed to update apps from DB: ' + db + '\n' + err
                );
            }
            // do in series otherwise chrome likes to cancel the ajax
            // calls with status 0
            async.forEachSeries(data.rows || [], function (r, cb) {
                var ddoc_url = ['', db, r.id].join('/');

                if (!exports.exists(ddoc_url, r.value.rev)) {
                    // does not exist at this revision, update
                    exports.refreshDoc(ddoc_url, cb);
                }
                else {
                    console.log(['skip', ddoc_url]);
                    cb();
                }
            },
            callback);
        });
    };

    exports.refreshDoc = function (ddoc_url, /*optional*/callback) {
        callback = callback || logErrorsCallback;

        couchr.get('/_api/' + ddoc_url, function (err, ddoc) {
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

            // called after icons have been downloaded etc
            var doUpdate = function () {
                console.log(['update', ddoc_url, doc]);
                exports.update(doc, callback);
            };

            if (!app_url) {
                // show document in futon
                doc.url = '/_utils/document.html?' +
                    ddoc_url.replace(/^\//, '');
                doc.unknown_root = true;
            }
            if (ddoc.app) {
                if (ddoc.app.title) {
                    doc.title = ddoc.app.title;
                }
                if (ddoc.app.icons) {
                    doc.icons = ddoc.app.icons;
                    var dashicon_url = '/_api/' + doc.ddoc_url + '/' +
                        ddoc.app.icons['22'];

                    utils.imgToDataURI(dashicon_url, function (err, url) {
                        if (!err && url) {
                            doc.dashicon = url;
                        }
                        doUpdate();
                    });
                }
                else {
                    doUpdate();
                }
            }
            else {
                doUpdate();
            }

        });
    };

}