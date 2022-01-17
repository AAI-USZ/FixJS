function(url, lastMod){
            $documentviewerPreview.html("");
            templateObject.contentURL = url;
            var date = new Date();
            if (date){
                templateObject.contentURL += "?_=" + date.getTime();
            }

            $documentviewerPreview.html(
                sakai.api.Util.TemplateRenderer('documentviewer_image_template', templateObject)
            );
        }