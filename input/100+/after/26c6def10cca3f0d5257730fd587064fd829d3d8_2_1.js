function loadTabs(properties) {
        if (!properties || properties.length === 0) {
            alert('No properties found for ',self.pathname);
            return;
        }

        var tabbed_pane = jQuery('<div id="'+self.id+'_tabs">'),
            tabs = jQuery('<ul>');

        self.elm.html("");
        self.elm.append(tabbed_pane);
        tabbed_pane.append(tabs);

        var tabcount = 0, selected = 0;

        jQuery.each(properties,function (name,val) {
            if (name === 'type') {
                if (self.elm.parent().hasClass('ui-dialog')) {
                    self.elm.dialog("option","title",val+': '+self.pathname);
                }
            }
            else {
                if (name.length > 10) {
                    tabname = name.substr(0,10);
                }
                else {
                    tabname = name;
                }

                var contentID = self.id+'_'+name,
                    tab = jQuery('<li id="'+contentID+'_tab">')
                        .append('<a href="#'+contentID+'">'+tabname+'</a>'),
                    contentPane = jQuery('<div id="'+contentID+'" style="overflow:auto"></div>');

                tabs.append(tab);
                tabbed_pane.append(contentPane);
                getContent(contentPane,name,val);
                if (self.initiallySelected == name) {
                    selected = tabcount;
                }
                tabcount = tabcount + 1;
            }
        });

        self.elm.height(400);
        self.elm.width(600);
        jQuery('#'+self.id).tabs({selected: selected});
        if (typeof openmdao_test_mode != 'undefined') {
            openmdao.Util.notify(self.pathname+' loaded');
        }
    }