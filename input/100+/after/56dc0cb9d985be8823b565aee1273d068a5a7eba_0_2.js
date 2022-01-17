function(template){
            if (VIEWS.availableList.length > 0)
                VIEWS.availableList[0].first = true;
            var newloadDropdown = $(template.render(VIEWS));
            if (VIEWS.availableList.length > 0)
                delete VIEWS.availableList[0].first;
            $("#_timeline_load_view_submenu").replaceWith(newloadDropdown);

            $("a._timeline_load_link").click(function (event){
                event.preventDefault();
                var viewId = $(event.delegateTarget).attr("viewid");
                var mode = $(event.delegateTarget).hasClass("_timeline_channel_only") ? "channel" : $(event.delegateTarget).hasClass("_timeline_time_only") ? "time" : "all";
                loadViewDialogModeHandler(viewId,mode)
            });
        }