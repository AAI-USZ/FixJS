function doAjaxUpload(context, isMultiFile) {
        var response = '';
        var INTERACTIONUPLOADWRAPPER = '.java-interaction-uploader';
        var file = $('<input name="file" type="file" />'); // File uploads require a file input
        if (isMultiFile) { file.attr('multiple', 'multiple'); }
        var submit = null; // This will be a different function if XHR submits are not available
        var selectFile = function () {
            file.show();
            file.focus();
            file.click();
            file.hide();
        };

        file.change(function () { // File was selected by user
            submit();
        });

        //if XHR is available
        if (window.FormData) {
            context.query.uploadIsXhrCompat = true;
            var url = context.action + ((context.action.indexOf('?') > 0) ? '&' : '?') + $.param(context.query);
            // Wrap file control in an invisible container
            $('#' + INTERACTIONUPLOADWRAPPER).remove();
            var container = $('<div>', { style: 'overflow: hidden !important; display: inline-block !important; width: 0px !important; height: 0px !important; padding: 0px !important; margin: 0px !important; border: none !important;', id: INTERACTIONUPLOADWRAPPER }).insertAfter(context.element);
            container.html(file);
            submit = function () {
                var data = new FormData(); // Create a virtual form
                $.each(file[0].files, function (index) {
                    data.append('file' + (index > 0 ? index : ''), file[0].files[index]);
                });
                var request = new XMLHttpRequest(); // Create the XHR request
                request.open("POST", url);

                request.upload.onprogress = function (e) { // Handle Xhr Progress
                    var position = e.position || e.loaded;
                    var total = e.totalSize || e.total;
                    var value = position / total * 100;
                    context.element.trigger('ajaxform-progress', { position: position, total: total, value: value });
                };
                request.onprogress = request.upload.onprogress;

                request.onload = function (e) { // Handle XHR responses
                    response = e.target.response;
                    try { request.abort(); } catch (ex) { }
                    if (e.target.status === 200) {
                        context.onSuccess(response);
                    } else {
                        context.onError(response);
                    }
                    context.onComplete(response);

                };
                request.send(data); // Send the XHR request
            };
            selectFile();
        } else { // if XHR is not available - use iframe (this should eventually die away)
            context.query.uploadIsXhrCompat = false;
            var url = context.action + ((context.action.indexOf('?') > 0) ? '&' : '?') + $.param(context.query);
            // Wrap file control in an invisible iframe with form
            $('#' + INTERACTIONUPLOADWRAPPER).remove();
            var frame = $('<iframe>', { style: 'overflow: hidden !important; display: inline-block !important; width: 0px !important; height: 0px !important; padding: 0px !important; margin: 0px !important; border: none !important;', id: INTERACTIONUPLOADWRAPPER }).insertAfter(context.element);
            frame.one('load', function () { // When the frame is 'ready' add the hidden form
                var uploadBody = $(frame[0].contentDocument.body);
                var uploadForm = $('<form>', { action: url, method: "POST", enctype: "multipart/form-data" });
                file.appendTo(uploadForm);
                uploadBody.html(uploadForm);
                frame.one('load', function (e) { // Unfortunately we have no "fail" detection for form uploads
                    var result = e.target.contentWindow.document.body.innerText;
                    response = e.target.contentWindow.document.body.innerHTML;
                    if (result && result === 'error') { // meh? give SOME way to respond error
                        context.onError(response);
                    } else {
                        context.onSuccess(response);
                    }
                    context.element.trigger('ajaxform-nonxhrcomplete', response);
                    context.onComplete(response);
                });
                submit = function () { // Send the hidden form data
                    uploadForm.submit();
                };
                selectFile();
            });
        }
    }