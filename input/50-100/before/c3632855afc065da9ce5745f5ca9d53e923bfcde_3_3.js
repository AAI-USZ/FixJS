function() {
                    if (listOverlay) listOverlay.hide();
                    that.view.find('#header #searchbar').show();
                    selecterDiv.unbind('webkitTransitionEnd').hide();
                    selecterDiv.css('zIndex', '');
                    selecterDiv.prev().css('zIndex', '');
                    that.showingListSelector = false;
                }