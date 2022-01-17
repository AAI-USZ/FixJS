function () {
            // Set the name attribute of the textarea to the widget id, so we can restrict
            // tinyMCE loading to this widget
            var $textarea = $('textarea', $rootel).attr('name', tuid).addClass(tuid);
            // Fill up the textarea
            if (widgetData && widgetData.htmlblock) {
                var processedContent = sakai.api.i18n.General.process(widgetData.htmlblock.content);
                processedContent = sakai.api.Security.saneHTML(processedContent);
                $('#htmlblock_view_container', $rootel).html(processedContent);
                sakai.api.Util.renderMath($rootel);
                $textarea.val(widgetData.htmlblock.content);
            }
            // Set the height of the textarea to be the same as the height of the view mode,
            // so tinyMCE picks up on this initial height
            $textarea.css('height', $('#htmlblock_view_container', $rootel).height());
            loadTinyMCE();
        }