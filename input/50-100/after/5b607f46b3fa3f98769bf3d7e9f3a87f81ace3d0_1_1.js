function(target) {
            if (!isPreviewExist) {
                $("#embedcontent_name_checkbox").selected(true);
            }
            $("." + active_tab_class).removeClass(active_tab_class);
            $(target).addClass(active_tab_class);
            $("." + active_content_class).hide();
            $("#" + $(target).attr("id") + "_content").addClass(active_content_class).show();
        }