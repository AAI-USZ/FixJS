function(v, f){
            var data = "",
                file = {
                    'instance': instance_id,
                    'name': f.name || f.fileName,
                    'size': f.size,
                    'type': f.type,
                    'aborted': false,
                    'dataURL': false},
                finished = function(){
                    outstanding_uploads--;
                    if(outstanding_uploads <= 0) {
                        $upload_field.trigger("upload_finished_all");
                    }
                    $upload_field.trigger("upload_finished", [file]);
                },
                formData = new z.FormData();

            instance_id++;
            outstanding_uploads++;

            if ($upload_field.attr('data-allowed-types').split('|').indexOf(file.type) < 0) {
                var errors = [gettext('Images must be either PNG or JPG.')];
                if (typeof $upload_field.attr('multiple') !== 'undefined') {
                    // If we have a `multiple` attribute, assume not an icon.
                    if ($upload_field.attr('data-allowed-types').indexOf('video') > -1) {
                       errors.push([gettext('Videos must be in WebM.')]);
                    }
                }
                $upload_field.trigger('upload_start', [file]);
                $upload_field.trigger('upload_errors', [file, errors]);
                finished();
                return;
            }

            file.dataURL = $upload_field.objectUrl(v);

            // And we're off!
            $upload_field.trigger("upload_start", [file]);

            // Set things up
            formData.open("POST", url, true);
            formData.append("csrfmiddlewaretoken", csrf);
            formData.append("upload_image", f);

            // Monitor progress and report back.
            formData.xhr.onreadystatechange = function(){
                if (formData.xhr.readyState == 4 && formData.xhr.responseText &&
                    (formData.xhr.status == 200 || formData.xhr.status == 304)) {
                    var json = {};
                    try {
                        json = JSON.parse(formData.xhr.responseText);
                    } catch(err) {
                        var error = gettext("There was a problem contacting the server.");
                        $upload_field.trigger("upload_errors", [file, error]);
                        finished();
                        return false;
                    }

                    if(json.errors.length) {
                        $upload_field.trigger("upload_errors", [file, json.errors]);
                    } else {
                        $upload_field.trigger("upload_success", [file, json.upload_hash]);
                    }
                    finished();
                }
            };

            // Actually do the sending.
            formData.send();
        }