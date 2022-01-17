function() {
        var boundary = "-----multipartformboundary" + new Date().getTime();
        var blob = "";
        blob += "--" + boundary + "\r\n";
        blob += 'Content-Disposition: form-data; name="path"; ' +
                'filename="' + file.name + '"\r\n';
        blob += 'Content-Type: ' + file.type + '\r\n';
        blob += '\r\n';
        blob += reader.result;
        blob += '\r\n';
        blob += "--" + boundary + "--\r\n";
        blob += '\r\n';

        save_func.call(obj, options.success, options.error, {
            buttons: options.buttons,
            data: blob,
            processData: false,
            contentType: "multipart/form-data; boundary=" + boundary,
            xhr: function() {
                var xhr = $.ajaxSettings.xhr();

                xhr.send = function(data) {
                    xhr.sendAsBinary(data);
                };

                return xhr;
            }
        });
    }