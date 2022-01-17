function() {
            var that = this;
            
            var _hideListSelectButtons = function(listOverlay) {
                
                var selecterDiv = that.view.find('#header #listselect');
                
                var onComplete = function() {
                    if (listOverlay) listOverlay.hide();
                    that.view.find('#header #searchbar').show();
                    selecterDiv.unbind('webkitTransitionEnd').hide();
                    selecterDiv.css('zIndex', '');
                    selecterDiv.prev().css('zIndex', '');
                    that.showingListSelector = false;
                }
                selecterDiv.bind('webkitTransitionEnd', onComplete);
                
                selecterDiv.css('-webkit-transform', 'translateY(-' + selecterDiv.height() + 'px)');
            }
            
            var _showListSelectButtons = function() {
                
                if (that.showingListSelector) return;
                else that.showingListSelector = true;
                
                var selecterDiv = that.view.find('#header #listselect'),
                    listOverlay = that.view.find('#listscroller').addOverlay(),
                    overlayZIndex = $j.topZIndex(listOverlay.elem);
                    
                var onShow = function() {
                    
                    that.view.find('#header #searchbar').hide();
                    selecterDiv.css('visibility', '').css('-webkit-transform', 'translateY(0px)')
                    
                    var elemTouch = function(e) {
                        e.preventDefault(); 
                        
                        var theTarget = e.target;
                        
                        //clear search 
                        that.view.find('#header #searchbar>form>input[type=search]').val('');
                        that.view.find('#header #searchbar>form>button').hide();
                        
                        _hideListSelectButtons(listOverlay); 
                        that._displayList(theTarget.id);
                        
                        return true;
                    }
                    var externalTouch = function(e) { 
                        var theTarget = e.target;
                        if (theTarget.nodeType == 3) theTarget = theTarget.parentNode;
                    
                        var listPage = $j('#listpage');
                        if ($j(theTarget).is(listPage) || listPage.has(theTarget).length > 0) e.preventDefault(); 
                        
                        _hideListSelectButtons(listOverlay); return true; 
                    }
                    selecterDiv.find('button').windowTouch(elemTouch, externalTouch, true);
                }
                
                selecterDiv.prev().css('zIndex', overlayZIndex+2);
                selecterDiv.css('zIndex', overlayZIndex+1);
                selecterDiv.css(vendor+'TransitionProperty', '').css('-webkit-transform', 'translateY(-' + selecterDiv.height() + 'px)');
                selecterDiv.css(vendor+'TransitionProperty', '-webkit-transform').css('visibility', 'hidden').show('fast', onShow);
            }
        
            that._addSearchListeners();
            that.view.find('#header #titlebar').unbind().click(_showListSelectButtons);            
            that.view.find('#listscroller #scroller #contactlist').unbind().click(
                function(e) {
                    var theTarget = e.target;
                    
                    if (that.loadingItem) return;
                    
                    theTarget = $j(theTarget).closest('li', that.view);
                    e.preventDefault();
                    
                    if (theTarget.length && !theTarget.hasClass('listseparater') && 
                        typeof that.options.onItemSelect == 'function') {
                        that.selectContact(theTarget[0].id.substring(8));
                    }
                });
        }