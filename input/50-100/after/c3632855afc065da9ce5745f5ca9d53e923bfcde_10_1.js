function(e) {
            var onSlideBack = function() {
                $j('#detailpage').css('visibility', 'hidden');
                listView.resetSelectedContact();
            }
            $j('#detailpage .header #left').off();
            if (useAnimations) {
                $j('#detailpage').changePage('#listpage', true, onSlideBack); 
            } else {
                $j('#detailpage').hide();
                $j('#listpage').show().css('visibility', '');
                onSlideBack();
            }
            updateLastVisitLoc();
        }