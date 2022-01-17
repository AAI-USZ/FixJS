function() {
            var thisItem = $(this);
            if (thisItem.attr("href")) {
	            if ($.UINavigationEvent) {
	                return;
	            } else {
                    thisItem.addClass("clicked");
                    setTimeout(function(){
                        thisItem.removeClass("clicked");
                        $.UINavigationEvent = false;
                        navigateList(thisItem);
                        $.UINavigationEvent = true;
                    },500);
	            }
            }
        }