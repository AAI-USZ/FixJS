function() {

            $savecontent_save.removeAttr("disabled");

            var savecontentTop = clickedEl.offset().top + clickedEl.height() - 3;
            var savecontentLeft = clickedEl.offset().left + clickedEl.width() / 2 - 122;

            $savecontent_widget.css({
                top: savecontentTop,
                left: savecontentLeft
            });

            var json = {
                "files": contentObj.data,
                "context": contentObj.context,
                "libraryHasIt": contentObj.libraryHasIt,
                "groups": contentObj.memberOfGroups,
                "sakai": sakai
            };
            $savecontent_container.html(sakai.api.Util.TemplateRenderer("#savecontent_template", json));
            enableDisableAddButton();
            $savecontent_widget.jqmShow();
        }