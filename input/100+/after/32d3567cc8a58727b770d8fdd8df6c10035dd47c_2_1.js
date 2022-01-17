function (name,val) {
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
                    tab = jQuery('<li id="'+contentID+'_tab">')
                        .append('<a href="#'+contentID+'">'+tabname+'</a>'),
                    contentPane = jQuery('<div id="'+contentID+'" style="overflow:auto"></div>');

                tabs.append(tab);
                tabbed_pane.append(contentPane);
                getContent(contentPane,name,val);
            }
        }