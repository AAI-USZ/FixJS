function(pullDownCallback) {
            var that = this;
        
            if (typeof pullDownCallback == 'function') {
                that.contactListPullDownCB = pullDownCallback;
            }
            
            if (that.listpagescroll === undefined) {
                var callback = function() { 
                    //This way we can update the underlying callback without updating the callback on scroller.
                    if (typeof that.contactListPullDownCB == 'function') that.contactListPullDownCB(); 
                }
                that.listpagescroll = createScroller('listscroller', callback);
                $j(window).orientationChange(that._initiateContactListScroller);
            } else if (that.listpagescroll) {
                that.listpagescroll.refresh();
            }
        }