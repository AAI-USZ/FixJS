function (editor, cb) {
        var http = require('http'),
            editorInfo = editor.getDocInfo(),
            data = '';

        http.get(
            { path: '/package/' + editorInfo.factory + '/image'},
            function (res) {
                res.on('data', function (d) {
                    data += d;
                });
                res.on('end', function () {
                    var jsonData = JSON.parse(data);
                    topBottomConfig(
                        label,
                        'baseui',
                        'ImagePicker',
                        { urls: jsonData },
                        390,
                        100,
                        25,
                        function (err, ctrl) {
                            if (err) {
                                return cb(err);
                            }
                            // we should setup the editor that we got,
                            // to add set data and get data and notification
                            ctrl.setData = function (txt) {
                                ctrl.children.data.setSelectedUrl(txt);
                            };
                            ctrl.getData = function () {
                                return ctrl.children.data.getSelectedUrl();
                            };
                            ctrl.children.data.on('change', function (sel) {
                                ctrl.emit('change', sel);
                            });
                            cb(err, ctrl);
                        }
                    );


                });
                res.on('error', function (e) {
                    cb(e);
                });
            }
        );
    }