function(e) {
            var tab = $(e.target).attr("id").split(tab_id_prefix)[1];
            if ($(e.target).parent("li").hasClass(active_tab_class)) {
                return false;
            } else {
                toggleTabs(e.target);
            }
            if (tab === 'display' && !defaultsSet && !wData && sakai.widgets.embedcontent.defaultOptions) {
                setDefaultOptions(sakai.widgets.embedcontent.defaultOptions);
                defaultsSet = true;
            }
            return false;
        }