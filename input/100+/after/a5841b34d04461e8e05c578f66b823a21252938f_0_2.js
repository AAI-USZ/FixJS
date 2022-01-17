function(id, o, args) {
                    
                    // Load left block
                    var labels = Y.JSON.parse(o.responseText);
                    
                    if (typeof labels.error != 'undefined') {
                        M.block_jmail.displayError(labels);
                        return false;
                    }
                    
                    M.block_jmail.labels = labels;
                    var labelsHtml = '';
                    var menuItems = [{text: M.str.block_jmail.inbox, value: 'inbox'}];
                    
                    for(var el in labels) {
                        var l = labels[el];
                        labelsHtml += '<li class="folder"><em></em><a href="#" id="label'+l.id+'">'+l.name+'</a><span class="labelactions" style="visibility: hidden"><img id="labelactions'+l.id+'" src="pix/menu.png"></span></li>';
                        menuItems.push({text: l.name, value: l.id})
                    }
                    
                    var cList = Y.one('#user_labels');
                    cList.set('text','');
                    cList.append('<ul>'+labelsHtml+'</ul>');
                    
                    Y.all("#user_labels li").on('mouseover', function(e){                                                
                         e.target.ancestor('li', true).one('.labelactions').setStyle('visibility', 'visible');
                    });
                    
                    Y.all("#user_labels li").on('mouseout', function(e) {
                        e.target.ancestor('li', true).one('.labelactions').setStyle('visibility', 'hidden');
                    });
                    
                    Y.all('#user_labels a').on('click', function(e){        
                        M.block_jmail.checkMail(e.target.get('id').replace("label",""));
                        e.preventDefault();
                    });
                                       
                    Y.all("#user_labels img").on('click', function(e){
                            //Y.all("#user_labels li .labelactions").setStyle('visibility', 'hidden');
                            M.block_jmail.app.labelsMenu.cfg.setProperty('context', [e.target.get('id'),'tr','tr']);
                            M.block_jmail.app.labelsMenu.cfg.setProperty('visible', true);
                            M.block_jmail.app.labelsMenu.cfg.setProperty('zindex', 70);
                            M.block_jmail.currentLabel = e.target.get('id').replace("labelactions","");
                        });
                    
                    // TODO Load move button labels                    
                    var oMenu = M.block_jmail.app.moveButton.getMenu();
                    if (YAHOO.util.Dom.inDocument(oMenu.element)) {                                                 
                        oMenu.clearContent();
                        oMenu.addItems(menuItems);
                        oMenu.render();
                    } else {                        
                        // Delete the duplicate inbox, this is due because we render in a special way the initial button                        
                        menuItems.shift();
                        oMenu.itemData = menuItems;
                    }
            }