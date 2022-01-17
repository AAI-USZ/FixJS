function(url, data){
            $documentviewerPreview.html("");

            if (data && data['sakai:hasPreview'] === 'true' && data['sakai:needsprocessing'] === 'false' && data.page1) {
                templateObject.contentURL = getPath(data.page1) + '.normal' + getImagePreviewExtension(data.page1._mimeType);
            } else {
                templateObject.contentURL = url;
            }
            var date = new Date();
            if (date){
                templateObject.contentURL += "?_=" + date.getTime();
            }

            $documentviewerPreview.html(
                sakai.api.Util.TemplateRenderer('documentviewer_image_template', templateObject)
            );
        }