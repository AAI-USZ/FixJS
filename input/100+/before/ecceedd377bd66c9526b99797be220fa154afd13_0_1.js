function(o){
        var arActions = [];
        var q = Ext.DomQuery;
        
        if (this.dominoActionbar.actionbar) {
            arActions = q.select('a', this.dominoActionbar.actionbar);
        }
        
        var curLevelTitle = '';
        var isFirst = false;
        
        for (var i = 0; i < arActions.length; i++) {
            var action = arActions[i];
            var title = action.lastChild.nodeValue;
            var slashLoc = (title) ? title.indexOf('\\') : -1;
            var imageRef = q.selectValue('img/@src', action, null);
            // if imageRef is null, leave it that way
            // if not and the path is an absolute path, use that, otherwise build the path
            imageRef = (imageRef == null) ? null : (imageRef && (imageRef.indexOf('/') == 0 || imageRef.indexOf('http') == 0)) ? imageRef : this.dbPath + imageRef;
            var cls = (title == null) ? 'x-btn-icon' : (imageRef) ? 'x-btn-text-icon' : null;
            
            if (slashLoc > 0) { // we have a subaction
                isSubAction = true;
                var arLevels = title.split('\\');
                var iLevels = arLevels.length;
                var tmpCurLevelTitle = title.substring(0, slashLoc);
                title = title.substring(slashLoc + 1);
                
                if (tmpCurLevelTitle != curLevelTitle) {
                    curLevelTitle = tmpCurLevelTitle
                    isFirst = true;
                }
                else {
                    isFirst = false;
                }
            }
            else {
                isSubAction = false;
                curLevelTitle = '';
            }
            
            // get the onclick and href attributes
            var handler, sHref, tmpOnClick, oOnClick, arOnClick;
            // sHref = q.selectValue('@href',action,''); // there's a bug in IE with getAttribute('href') so we can't use this
            sHref = action.getAttribute('href', 2); // IE needs the '2' to tell it to get the actual href attribute value;
            if (sHref != '') {
                tmpOnClick = "location.href = '" + sHref + "';";
            }
            else {
                // tmpOnClick = q.selectValue('@onclick',action,Ext.emptyFn);
                // tmpOnClick = action.getAttribute('onclick');
                // neither of the above ways worked in IE. IE kept wrapping the onclick code
                // in function() anonymous { code }, instead of just returning the value of onclick
                oOnClick = action.attributes['onclick'];
                if (oOnClick) {
                    tmpOnClick = oOnClick.nodeValue;
                }
                else {
                    tmpOnClick = ''
                }
                
                // first, let's remove the beginning 'return' if it exists due to domino's 'return _doClick...' code that is generated to handle @formulas
                if (tmpOnClick.indexOf('return _doClick') == 0) {
                    tmpOnClick = tmpOnClick.substring(7);
                }
                
                // now, let's remove the 'return false;' if it exists since this is what domino usually adds to the end of javascript actions
                arOnClick = tmpOnClick.split('\r'); // TODO: will \r work on all browsers and all platforms???
                var len = arOnClick.length;
                if (arOnClick[len - 1] == 'return false;') {
                    arOnClick.splice(arOnClick.length - 1, 1); // removing the 'return false;' that domino adds
                }
                tmpOnClick = arOnClick.join('\r');
            }
            
            // assigne a handler
            var handler = function(){
                var bleh = tmpOnClick;
                return function(){
                    return eval(bleh);
                }
            }().createDelegate(this);
            
            
            // handle subActions
            if (isSubAction) {
                // special case for the first one
                if (isFirst) {
                    if (i > 0) {
                        // add separator
                        this.actions.push('-');
                    }
                    
                    // add action
                    this.actions.push({
                        text: curLevelTitle,
                        menu: {
                            items: [{
                                text: title,
                                cls: cls,
                                icon: imageRef,
                                handler: handler
                            }]
                        }
                    });
                    
                    // subaction that is not the first one
                }
                else {
                    // length-1 so we can get back past the separator and to the top level of the dropdown
                    this.actions[this.actions.length - 1].menu.items.push({
                        text: title,
                        cls: cls,
                        icon: imageRef,
                        handler: handler
                    });
                }
                // normal non-sub actions
            }
            else {
                if (i > 0) {
                    // add separator
                    this.actions.push('-');
                }
                
                // add action
                this.actions.push({
                    text: title,
                    cls: cls,
                    icon: imageRef,
                    handler: handler
                });
            } // end if(isSubAction)
        } // end for arActions.length
        // now process these actions by adding to the toolbar and syncing the grid's size
        this.processActions();
        
        // now delete the original actionbar (table) that was sent from domino
        this.removeDominoActionbar();
        
        // tell the listeners to actionsloaded that we are done
        this.fireEvent('actionsloaded', this);
        
    }