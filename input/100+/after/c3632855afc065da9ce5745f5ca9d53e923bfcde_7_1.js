function(listOverlay) {
                
                var selecterDiv = that.view.find('#header #listselect');
                
                var onComplete = function() {
                    if (listOverlay) listOverlay.hide();
                    that.view.find('#header #searchbar').show();
                    selecterDiv.off('webkitTransitionEnd').hide();
                    selecterDiv.css('zIndex', '');
                    selecterDiv.prev().css('zIndex', '');
                    that.showingListSelector = false;
                }
                selecterDiv.on('webkitTransitionEnd', onComplete);
                
                selecterDiv.css('-webkit-transform', 'translateY(-' + selecterDiv.height() + 'px)');
            }