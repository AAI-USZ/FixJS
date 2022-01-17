function loadTabs(properties) {
        if (!properties || properties.length === 0) {
            alert('No properties found for ',self.pathname);
            return;
        }

        var style = 'style="padding:5px;"',
            dl = jQuery('<dl id="'+self.id+'_tabs"></dl>');

        self.elm.html("");
        self.elm.append(dl);

        var tabcount = 0;

        jQuery.each(properties,function (name,val) {
            if (name === 'type') {
                if (self.elm.parent().hasClass('ui-dialog')) {
                    self.elm.dialog("option","title",val+': '+self.pathname);
                }
            }
            else {
                tabcount = tabcount + 1;

                if (name.length > 10) {
                    tabname = name.substr(0,10);
                }
                else {
                    tabname = name;
                }

                var contentID = self.id+'_'+name,
                    tabID = contentID+'_tab',
                    targetID = contentID+'_pane',
                    dt = jQuery('<dt id="'+tabID+'" target="'+targetID+'">'+tabname+'</dt>'),
                    dd = jQuery('<dd id="'+targetID+'"></dd>'),
                    contentPane = jQuery('<div id="'+contentID+'" '+style+'></div>');

                dl.append(dt);
                dl.append(dd);
                dd.append(contentPane);

                getContent(contentPane,name,val);
            }
        });

        self.elm.width((tabcount+1)*75);

        openmdao.TabbedPane(self.id);
        var selectID = '#'+self.id+'_'+self.initiallySelected+'_tab';
        jQuery(selectID).click();
        openmdao.Util.notify(self.pathname+' loaded');
    }