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
        }