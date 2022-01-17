function(data){
            sakai.api.Util.TemplateRenderer("documentviewer_html_template", templateObject, $documentviewerPreview);
            $("#documentviewer_html_iframe", $rootel).attr("src", getPath(data));
            $("#documentviewer_html_iframe", $rootel).attr("frameborder", "0");
        }